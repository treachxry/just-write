import { Note } from "@/models/Note.ts";

export interface NoteCollection {
    items: Note[]
    pins: string[]
}