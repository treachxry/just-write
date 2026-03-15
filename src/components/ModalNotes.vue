<script setup lang="ts">
    import { Lock, LockOpen, Pin, PinOff, Trash2 } from "lucide-vue-next";
    import InputTextarea from "@/components/InputTextarea.vue";
    import { useNotes } from "@/composables/useNotes.ts";

    const {notes, createNote, swapPin, deleteNote, getPinIndex} = useNotes();
</script>

<template>
    <dialog class="modal">
        <div class="modal-box grid gap-6">
            <div v-for="note in notes.items" :key="note.id">
                <div class="flex items-center px-2 gap-2">
                    <span class="me-auto">
                        {{note.title}}
                    </span>

                    <button class="p-1" @click="swapPin(note.id)">
                        <pin-off v-if="getPinIndex(note.id) >= 0" class="size-4 text-error"/>
                        <pin v-else class="size-4 text-base-content/60"/>
                    </button>

                    <button class="p-1" @click="note.allowModify = !note.allowModify">
                        <lock v-if="!note.allowModify" class="size-4 text-error"/>
                        <lock-open v-else class="size-4 text-base-content/60"/>
                    </button>

                    <button class="p-1" @click="deleteNote(note.id)">
                        <trash2 class="size-4 text-error"/>
                    </button>
                </div>

                <input-textarea
                    v-model="note.content"
                    class="textarea-secondary text-base-content/60"
                    placeholder="Place anything extra here..."
                    :disabled="!note.allowModify"
                    :rows="1"
                />
            </div>

            <div>
                <button class="btn btn-success" @click="createNote">New note</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>
</template>