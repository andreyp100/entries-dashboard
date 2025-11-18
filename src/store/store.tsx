import { create } from "zustand";
import { type IFetchStore, type IEntry, type IEntryStore, type IApiRequestConfig, type IModalStore, type ICategory, type ICategoryStore, type TFetchStatus} from "../types/types";
import axios from "axios";

export const useEntryStore = create<IEntryStore>((set, get) => {
  return {
    status: "idle",
    setStatus: (updatedStatus: TFetchStatus) => set(() => ({status: updatedStatus})),
    entries: [],
    addEntry: (entry:IEntry) => set((state) => ({entries: [...state.entries,entry]})),
    removeEntry: (entryId: number) => set((state) => ({entries: [...state.entries.filter(e => e.id != entryId)]})),
    updateEntries: (entries: IEntry[]) => set(() => ({entries}) ),
  }
})

export const useCategoryStore = create<ICategoryStore>((set, get) => {
  return {
    status: "idle",
    setStatus: (updatedStatus: TFetchStatus) => set(() => ({status: updatedStatus})),
    categories: [],
    addCategory: (category: ICategory) => set((state) => ({categories: [...state.categories, category].sort((a,b) => b.limit - a.limit)})),
    editCategory: (category: ICategory) => set((state) => {
      const categoryToReplace = state.categories.find(c => c.id === category.id);
      if (categoryToReplace){
        const categoryIndex = state.categories.indexOf(categoryToReplace)
        const categoriesTemp = [...state.categories]
        categoriesTemp.splice(categoryIndex, 1, category)
        return {categories: categoriesTemp}
      } else {
        return {categories: state.categories}
      }
    }),
    deleteCategory: (category: ICategory) => set((state) => ({categories: [...state.categories.filter(c => c.name != category.name)]})),
    updateCategories: (categories: ICategory[]) => set(() => ({categories: categories}))
  }
})




export const useFetchStore = create<IFetchStore>((set, get) => {

  const apiRequest = async (requestConfig: IApiRequestConfig): Promise<void> => {
    
    const apiAddress = `${import.meta.env.VITE_DB_ADDRESS}:${import.meta.env.VITE_DB_PORT}`;
    const {method, endpoint, data, storeMethod, updateAfterRequest, store} = requestConfig;    

    const stores = {
      entries: useEntryStore,
      categories: useCategoryStore
    }

    stores[store].getState().setStatus("loading")


    try{      
      const response = await axios[method](`${apiAddress}${endpoint}`, data)
      if (response.data){
         storeMethod(response.data)
         updateAfterRequest && get().getEntries()
         stores[store].getState().setStatus("success")
      }
    } catch (err: any){   
      stores[store].getState().setStatus("error")
      throw err
    }
  }

  return {
      getEntries: () => apiRequest({
        method: "get",
        endpoint: "/entries",
        storeMethod: useEntryStore.getState().updateEntries,
        store: "entries"
      }),
      addEntry: (entry: IEntry) => apiRequest({
        method: "post",
        endpoint: "/entry",
        data: entry,
        storeMethod: useEntryStore.getState().addEntry,
        updateAfterRequest: true,
        store: "entries" 
      }),   
      removeEntry: (entryId: number) => apiRequest({
        method: "delete",
        endpoint: "/entry",
        data: entryId,
        storeMethod: useEntryStore.getState().removeEntry,
        updateAfterRequest: true,
        store: "entries"
      }),
      getCategories: () => apiRequest({
        method: "get",
        endpoint: "/categories/list",
        storeMethod: useCategoryStore.getState().updateCategories,
        store: "categories"
      }),
      addCategory: (category: ICategory) => apiRequest({
        method: "post",
        endpoint: "/category/add",
        data: category,
        storeMethod: 
          useCategoryStore.getState().addCategory,
        store: "categories"
      }),
      editCategory: (category: ICategory) => apiRequest({
        method: "post",
        endpoint: "/category/edit",
        data: category,
        storeMethod: useCategoryStore.getState().editCategory,
        store: "categories"
      }),
      deleteCategory: (id: ICategory["id"]) => apiRequest({
        method: "delete",
        endpoint: `/category/delete/${id}`,
        storeMethod: useCategoryStore.getState().deleteCategory,
        store: "categories",
      })
    }
})

export const useModalStore = create<IModalStore>((set, get) => {


  const updateModalState = (toggleValue: boolean, modalName: keyof IModalStore, data?: any) => {
     return set((state) => ({
      [`${modalName}`]: {...state[modalName],
         isOpen: toggleValue,
         data: data
        }}))
  }

  
  return {
    newEntry: {
      name: "newEntry",
      isOpen: false,
      toggleModal: (toggleValue: boolean, data: any) => updateModalState(toggleValue, "newEntry", data)
    },
    category: {
      name: "category",
      isOpen: false,
      toggleModal: (toggleValue: boolean, data: any) => updateModalState(toggleValue, "category", data),
    },
    deleteConfirmation: {
      name: "deleteConfirmation",
      isOpen: false,
      toggleModal: (toggleValue: boolean, data: any) => updateModalState(toggleValue, "deleteConfirmation", data)
    }
  }
})
