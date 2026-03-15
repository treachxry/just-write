<script setup lang="ts">
    import { computed } from "vue";
    import { useLocalStorage } from "@vueuse/core";
    import { useRepeatingAudio } from "@/composables/useRepeatingAudio.ts";
    import AppFooter from "@/components/AppFooter.vue";
    import AppHeader from "@/components/AppHeader.vue";
    import { initializeSettings } from "@/composables/useSettings.ts";
    import { initializeNotes } from "@/composables/useNotes.ts";
    import { Note } from "@/models/Note.ts";

    const {settings} = initializeSettings();
    const {notes} = initializeNotes();

    const text = useLocalStorage<string>(
        'jw-text',
        ''
    );

    const audio = useRepeatingAudio(computed(() => {
        return settings.value.typingSound;
    }));

    const pinnedNotes = computed<Note[]>(() => {
        return notes.value.items.filter(n => notes.value.pins.includes(n.id));
    });
</script>

<template>
    <main class="h-full relative bg-base-300" :data-theme="settings.theme">
        <div class="flex flex-col h-full">
            <app-header/>

            <textarea
                v-model="text"
                class="grow overflow-hidden w-full resize-none outline-0 overflow-y-scroll p-3"
                :style="{fontSize: `${settings.font.size}px`, fontFamily: settings.font.name}"
                placeholder="Write here..."
                @input="audio.play()"
            />

            <div class="w-full p-2 grid gap-2">
                <div v-for="note in pinnedNotes" class="bg-base-100 p-2 rounded-lg">
                    <div>{{note.title}}</div>
                    <div>{{note.content}}</div>
                </div>
            </div>

            <app-footer :settings :text/>
        </div>
    </main>
</template>