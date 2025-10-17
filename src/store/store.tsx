import { create } from "zustand";
import { type IFetchStore, type IEntry, type IEntryStore } from "../types/types";
import axios from "axios";

export const useEntryStore = create<IEntryStore>((set, get) => {
  return {
    entries: [],
    addEntry: (entry:IEntry) => set((state) => ({entries: [...state.entries, entry]})),
    removeEntry: (entryId: number) => set((state) => ({entries: [...state.entries.filter(e => e.id != entryId)]})),
    categories: []
  }
})

export const useFetchStore = create<IFetchStore>((set, get) => {

  const apiAddress = `${import.meta.env.VITE_DB_ADDRESS}:${import.meta.env.VITE_DB_PORT}`;

  return {
    getEntries: () => {
      axios.get(`${apiAddress}/entry`)
    },
    addEntry: (entry: IEntry) => {
      axios.post(`${apiAddress}/entry`, entry)
        .then(res => {
          console.log("api post res: ", res);    
          useEntryStore.getState().addEntry(res.data)
        })
        .catch(err => console.log("add err:", err))
      return entry
    },
    removeEntry: (entryId: number) => {
      axios.delete(`${apiAddress}/entry/${entryId}`)
        .then(res => {
          console.log("api delete res: ", res)
        })
        .catch(err => console.log("delete err:", err))
        
    }
  }
})
