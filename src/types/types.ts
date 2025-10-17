export interface IEntry {
  id: number,
  date: number,
  name: string,
  sum: number | '',
  category: string
}

export interface IEntryStore {
  entries: IEntry[],
  addEntry: (entry: IEntry) => void,
  removeEntry: (entryId: number) => void,
  categories: IEntry["category"][];
}

export type TNewEntry  = Omit<IEntry, "id">

export interface IModalProps {
  isOpen: boolean,
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IFetchStore {
  getEntries: () => void,
  addEntry: (entry: IEntry) => IEntry,
  removeEntry: (entryId: number) => void
}
