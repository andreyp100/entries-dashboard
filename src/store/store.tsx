import { create } from "zustand";
import type { IEntry, IEntryStore } from "../types/types";

export const useEntryStore = create<IEntryStore>((set) => {
  return {
    entries: [],
    addEntry: (entry:IEntry) => set((state) => ({entries: [...state.entries, entry]})),
    removeEntry: (entryId: number) => set((state) => ({entries: [...state.entries.filter(e => e.id != entryId)]})),
    categories: []
  }
})
