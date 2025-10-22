export type TFetchStatus = "idle" | "loading" | "success" | "error";

export type TApiMethod<T = undefined> = (data?: T | any) => Promise<void>

export interface IFetchStore {
  getEntries: TApiMethod,
  addEntry: TApiMethod<IEntry>,
  removeEntry: TApiMethod<number>
  getCategories: TApiMethod,
  addCategory: TApiMethod<string>
}

export interface IApiRequestConfig<T = any> {
  method: "get" | "post" | "delete",
  endpoint: string,
  data?: T,
  entryStoreMethod: (data:IEntry | IEntry[] | number | any) => void,
  updateAfterRequest?: boolean
}

export interface ICategory {
  name: string,
  isPrimary: boolean
}

export interface IEntry {
  id: number,
  date: number,
  name: string,
  sum: number | '',
  category: ICategory
}

export interface IEntryStore {
  entries: IEntry[],
  updateEntries: (entries: IEntry[]) => void;
  addEntry: (entry: IEntry) => void,
  removeEntry: (entryId: number) => void,
  categories: ICategory[];
  addCategory: (category: ICategory) => void,
  updateCategories: (categories: ICategory[]) => void,
  status: TFetchStatus
  setStatus: (status: TFetchStatus) => void;
}

export type TNewEntry  = Omit<IEntry, "id" | "category"> & {categoryName: string}

export interface IModalProps {
  name: string,
  isOpen: boolean,
  setOpenState: (value: boolean) => void
}


export interface IModalStore {
  newEntry: IModalProps,
  newCategory: IModalProps
}

export interface ICategorySelectOptions {
  label: string,
  value: string
}



