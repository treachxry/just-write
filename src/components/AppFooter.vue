<script setup lang="ts">
    import { computed } from "vue";
    import { countWords } from "alfaaz";
    import { Settings } from "@/models/Settings.ts";

    const {settings, text} = defineProps<{
        settings: Settings
        text: string
    }>();

    const actualProgress = computed<number>(() => {
        switch(settings.goal.unit) {
            case 'words':
                return countWords(text);
            case 'characters':
                return text.length;
            default:
                return 0;
        }
    });

    function formatNumber(value: number): string {
        return new Intl.NumberFormat().format(value);
    }
</script>

<template>
    <div class="bg-base-100" v-if="settings.goal.enabled || settings.goal.showWordCount">
        <div class="grid grid-cols-3 text-xs px-3 py-2 text-base-content/60 text-nowrap">
            <div class="text-start">
                <span v-if="settings.goal.showWordCount">
                    <span>{{ formatNumber(actualProgress) }} {{ settings.goal.unit }}</span>
                </span>
            </div>
            <div class="text-center">
                <span v-if="settings.goal.enabled && settings.goal.showPercentage">
                    {{ formatNumber(Math.floor(actualProgress / settings.goal.count * 100)) }}%
                </span>
            </div>
            <div class="text-end">
                <span v-if="settings.goal.enabled">
                    {{ formatNumber(settings.goal.count) }} {{ settings.goal.unit }}
                </span>
            </div>
        </div>

        <div v-if="settings.goal.enabled" class="flex bg-base-content/20 w-full h-2">
            <div class="bg-primary max-w-full" :style="{width: `${actualProgress / settings.goal.count * 100}%`}"/>
        </div>
    </div>
</template>