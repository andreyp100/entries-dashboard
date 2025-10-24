import { create } from "zustand";
import { type IFetchStore, type IEntry, type IEntryStore, type IApiRequestConfig, type IModalStore, type ICategory } from "../types/types";
import axios from "axios";

export const useEntryStore = create<IEntryStore>((set, get) => {
  return {
    status: "idle",
    setStatus: (updatedStatus: IEntryStore["status"]) => set(() => ({status: updatedStatus})),
    entries: [],
    addEntry: (entry:IEntry) => set((state) => ({entries: [...state.entries,entry]})),
    removeEntry: (entryId: number) => set((state) => ({entries: [...state.entries.filter(e => e.id != entryId)]})),
    updateEntries: (entries: IEntry[]) => set(() => ({entries}) ),
    categories: [],
    addCategory: (category: ICategory) => set((state) => ({categories: [...state.categories, category]})),
    updateCategories: (categories: IEntry["category"][]) => set(() => ({categories: categories}))
  }
})



export const useFetchStore = create<IFetchStore>((set, get) => {

  const apiRequest = async (requestConfig: IApiRequestConfig): Promise<void> => {
    
    const apiAddress = `${import.meta.env.VITE_DB_ADDRESS}:${import.meta.env.VITE_DB_PORT}`;
    const {method, endpoint, data, entryStoreMethod, updateAfterRequest} = requestConfig;    

    useEntryStore.getState().setStatus("loading")

    try{      
      const response = await axios[method](`${apiAddress}${endpoint}`, data, )
      entryStoreMethod(response.data)
      updateAfterRequest && get().getEntries()
      useEntryStore.getState().setStatus("success")
    } catch (err: any){      
      useEntryStore.getState().setStatus("error")
    }
  }

  return {
      getEntries: () => apiRequest({
        method: "get",
        endpoint: "/entries",
        entryStoreMethod: useEntryStore.getState().updateEntries
      }),
      addEntry: (entry: IEntry) => apiRequest({
        method: "post",
        endpoint: "/entry",
        data: entry,
        entryStoreMethod: useEntryStore.getState().addEntry,
        updateAfterRequest: true 
      }),   
      removeEntry: (entryId: number) => apiRequest({
        method: "delete",
        endpoint: "/entry",
        data: entryId,
        entryStoreMethod: useEntryStore.getState().removeEntry,
        updateAfterRequest: true
      }),
      getCategories: () => apiRequest({
        method: "get",
        endpoint: "/categories/list",
        entryStoreMethod: useEntryStore.getState().updateCategories
      }),
      addCategory: (category: ICategory) => apiRequest({
        method: "post",
        endpoint: "/category/add",
        data: category,
        entryStoreMethod: useEntryStore.getState().addCategory
      })
    }
})

export const useModalStore = create<IModalStore>((set, get) => {

  const updateModalState = (value: boolean, modalName: keyof IModalStore) => {
     return set((state) => ({[`${modalName}`]: {...state[modalName], isOpen: value}}))
  }
  
  return {
    newEntry: {
      name: "newEntry",
      isOpen: false,
      setOpenState: (value: boolean) => updateModalState(value, "newEntry")
    },
    newCategory: {
      name: "newCategory",
      isOpen: false,
      setOpenState: (value: boolean) => updateModalState(value, "newCategory")
    }}
})
