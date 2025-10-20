import { create } from "zustand";
import { type IFetchStore, type IEntry, type IEntryStore, type IApiRequestConfig } from "../types/types";
import axios from "axios";

export const useEntryStore = create<IEntryStore>((set, get) => {
  return {
    status: "idle",
    setStatus: (updatedStatus: IEntryStore["status"]) => set(() => ({status: updatedStatus})),
    entries: [],
    addEntry: (entry:IEntry) => set((state) => ({entries: [...state.entries, entry]})),
    removeEntry: (entryId: number) => set((state) => ({entries: [...state.entries.filter(e => e.id != entryId)]})),
    updateEntries: (entries: IEntry[]) => set(() => ({entries: entries}) ),
    categories: []
  }
})



export const useFetchStore = create<IFetchStore>((set, get) => {

  const apiRequest = async (requestConfig: IApiRequestConfig): Promise<void> => {
    
    const apiAddress = `${import.meta.env.VITE_DB_ADDRESS}:${import.meta.env.VITE_DB_PORT}`;
    const {method, endpoint, data, entryStoreMethod} = requestConfig;

    useEntryStore.getState().setStatus("loading")

    try{
      const response = await axios[method](`${apiAddress}${endpoint}`, data)
      useEntryStore.getState().updateEntries(response.data)
      entryStoreMethod(response.data)
      useEntryStore.getState().setStatus("success")    
    } catch (err: any){
      useEntryStore.getState().setStatus("error")
    }
  }

  return {
      getEntries: () => apiRequest({
        method: "get",
        endpoint: "/entry",
        entryStoreMethod: useEntryStore.getState().updateEntries
      }),
      addEntry: (entry: IEntry) => apiRequest({
        method: "post",
        endpoint: "/entry",
        data: entry,
        entryStoreMethod: useEntryStore.getState().addEntry 
      }),   
      removeEntry: (entryId: number) => apiRequest({
        method: "delete",
        endpoint: "/entry",
        data: entryId,
        entryStoreMethod: useEntryStore.getState().removeEntry
      })
    }
})
