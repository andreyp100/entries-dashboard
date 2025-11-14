import type { ButtonColorType } from "antd/es/button";
import type { ReactNode } from "react";

export type TFetchStatus = "idle" | "loading" | "success" | "error";

export type TApiMethod<T = undefined> = (data?: T | any) => Promise<void>

export interface IFetchStore {
  getEntries: TApiMethod,
  addEntry: TApiMethod<IEntry>,
  removeEntry: TApiMethod<number>
  getCategories: TApiMethod,
  addCategory: TApiMethod<string>,
  deleteCategory: TApiMethod<ICategory>
}

export interface IApiRequestConfig<T = any> {
  method: "get" | "post" | "delete",
  store: "entries" | "categories",
  endpoint: string,
  data?: T,
  storeMethod: (data:IEntry | IEntry[] | number | any) => void,
  updateAfterRequest?: boolean
}

export interface ICategory {
  name: string,
  isPrimary: boolean,
  limit: number,
  originalName?: string
}

export type TCategoryRecord = Omit<ICategory, "isPrimary"> & {currentSpent?: number}

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
  status: TFetchStatus
  setStatus: (status: TFetchStatus) => void;
}
export interface ICategoryStore {
  categories: ICategory[];
  addCategory: (category: ICategory) => void,
  updateCategories: (categories: ICategory[]) => void,
  editCategory: (category: ICategory) => void,
  deleteCategory: (category: ICategory) => void,
  status: TFetchStatus
  setStatus: (status: TFetchStatus) => void;
}

export type TNewEntry  = Omit<IEntry, "id" | "category"> & {categoryName: string}

export interface IModalData {
  value: boolean,
  data?: any
}

export interface IModalProps {
  name: string,
  isOpen: boolean,
  type?: string
  toggleModal: (toggleValue: boolean, data?: any) => void,
  data?: any,
  error?: string
}


export interface IModalStore {
  newEntry: IModalProps,
  newCategory: IModalProps,
  deleteConfirmation: IModalProps
}

export interface ICategorySelectOptions {
  label: string,
  value: string
}

export interface IButtonProps {
  onClick: (args: any) => void,
  title: string,
  color?: ButtonColorType,
  isTiny?: boolean
  icon?: ReactNode
}

export interface IError {
  status: number,
  message: string
}



