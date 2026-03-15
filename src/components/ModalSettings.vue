<script setup lang="ts">
    import sounds from "@/assets/sounds.json";
    import { useSettings } from "@/composables/useSettings.ts";
    import ConfigFont from "@/components/ConfigFont.vue";
    import ConfigTheme from "@/components/ConfigTheme.vue";
    import ConfigSound from "@/components/ConfigSound.vue";
    import InputCheckbox from "@/components/InputCheckbox.vue";
    import InputNumberUnit from "@/components/InputNumberUnit.vue";

    const {settings, resetSettings} = useSettings();
</script>

<template>
    <dialog class="modal">
        <div class="modal-box grid gap-2">
            <fieldset class="fieldset flex gap-4">
                <legend class="fieldset-legend">
                    Writing goal
                </legend>

                <input-number-unit
                    v-model:value="settings.goal.count"
                    v-model:unit="settings.goal.unit"
                    :min="1"
                    :step="1"
                    :unit-list="['words', 'characters']"
                    :disabled="!settings.goal.enabled"
                />

                <input-checkbox v-model="settings.goal.enabled">Enabled</input-checkbox>
                <input-checkbox v-model="settings.goal.showPercentage" :disabled="!settings.goal.enabled">Show percentage</input-checkbox>
            </fieldset>

            <fieldset class="fieldset flex gap-4">
                <input-checkbox v-model="settings.goal.showWordCount">Word count</input-checkbox>
            </fieldset>

            <config-theme
                v-model="settings.theme"
            />

            <config-font
                v-model="settings.font"
            />

            <config-sound
                v-model="settings.typingSound"
                :sounds="sounds.typing"
            />

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Actions</legend>
                <div class="flex gap-2">
                    <button @click="resetSettings" class="btn btn-error btn-outline btn-sm">
                        Reset all settings
                    </button>
                </div>
            </fieldset>

            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>
</template>