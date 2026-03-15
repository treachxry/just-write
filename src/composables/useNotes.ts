import { useLocalStorage } from "@vueuse/core";
import { useSingleton } from "@/composables/useSingleton.ts";
import { NoteCollection } from "@/models/NoteCollection.ts";
import { Note } from "@/models/Note.ts";

const {initializeComposable, useComposable} = useSingleton<ReturnType<typeof useNotes>, void>(useNotes);

export {
    initializeComposable as initializeNotes,
    useComposable as useNotes
}

function useNotes() {
    const notes = useLocalStorage<NoteCollection>(
        'jw-notes',
        {
            items: [],
            pins: []
        }
    );

    function createNote() {
        const note: Note = {
            id: crypto.randomUUID(),
            title: 'Untitled note',
            content: '',
            allowModify: true,
            createdDate: Date.now(),
            modifiedDate: Date.now(),
        };

        notes.value.items.push(note);
    }

    function swapPin(id: string) {
        const index = getPinIndex(id);

        if(index < 0) {
            notes.value.pins.push(id);
        }
        else {
            notes.value.pins.splice(index, 1);
        }
    }

    function getPinIndex(id: string) {
        return notes.value.pins.indexOf(id);
    }

    function deleteNote(id: string) {
        const index = getPinIndex(id);

        if(index >= 0) {
            notes.value.pins.splice(index, 1);
        }

        const mainIndex = notes.value.items.findIndex(i => i.id === id);

        if(mainIndex >= 0) {
            notes.value.items.splice(mainIndex, 1);
        }
    }

    return {
        notes,
        createNote,
        deleteNote,
        swapPin,
        getPinIndex
    };
}