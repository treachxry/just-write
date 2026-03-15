<script setup lang="ts">
    import { NotepadTextIcon, SettingsIcon } from "lucide-vue-next";
    import ModalSettings from "@/components/ModalSettings.vue";
    import ModalNotes from "@/components/ModalNotes.vue";
</script>

<template>
    <div class="flex items-center bg-base-100">
        <!--
        <button onclick="notesModal.showModal()" class="btn btn-primary btn-ghost rounded-none">
            <notepad-text-icon :size="16"/>
            <span>Notes</span>
        </button>
        -->
        <button onclick="settingsModal.showModal()" class="btn btn-primary btn-ghost rounded-none ms-auto">
            <settings-icon :size="16"/>
            <span>Options</span>
        </button>

        <modal-notes id="notesModal"/>
        <modal-settings id="settingsModal"/>
    </div>
</template>