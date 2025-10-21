export type TFetchStatus = "idle" | "loading" | "success" | "error";

export type TApiMethod<T = undefined> = (data?: T | any) => Promise<void>

export interface IApiRequestConfig<T = any> {
  method: "get" | "post" | "delete",
  endpoint: string,
  data?: T,
  entryStoreMethod: (data:IEntry | IEntry[] | number | any) => void,
  updateAfterRequest?: boolean
}

export interface IEntry {
  id: number,
  date: number,
  name: string,
  sum: number | '',
  category: string
}

export interface IEntryStore {
  entries: IEntry[],
  updateEntries: (entries: IEntry[]) => void;
  addEntry: (entry: IEntry) => void,
  removeEntry: (entryId: number) => void,
  categories: IEntry["category"][];
  status: TFetchStatus
  setStatus: (status: TFetchStatus) => void;
}

export type TNewEntry  = Omit<IEntry, "id">

export interface IModalProps {
  isOpen: boolean,
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IFetchStore {
  getEntries: TApiMethod,
  addEntry: TApiMethod<IEntry>,
  removeEntry: TApiMethod<number>
}



