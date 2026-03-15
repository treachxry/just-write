import { Settings } from "@/models/Settings.ts";
import { useLocalStorage } from "@vueuse/core";
import { useSingleton } from "@/composables/useSingleton.ts";

const {initializeComposable, useComposable} = useSingleton<ReturnType<typeof useSettings>, void>(useSettings);

export {
    initializeComposable as initializeSettings,
    useComposable as useSettings
}

function useSettings() {
    const settings = useLocalStorage<Settings>(
        'jw-settings',
        getDefaultSettings
    );

    function getDefaultSettings(): Settings {
        return {
            theme: 'dark',
            background: undefined,
            font: {
                size: 16
            },
            typingSound: {
                path: undefined,
                volume: 100,
                muted: false
            },
            ambientSound: {
                path: undefined,
                volume: 100,
                muted: false
            },
            goal: {
                enabled: true,
                showWordCount: true,
                showPercentage: true,
                count: 200,
                unit: 'words'
            }
        };
    }

    function resetSettings(): void {
        settings.value = getDefaultSettings();
    }

    return {
        settings,
        resetSettings
    };
}