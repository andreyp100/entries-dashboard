import * as React from 'react'
import { Flex} from 'antd'
import MainTable from './components/MainTable'
import { NewEntryModal } from './Modals/NewEntryModal'
import { useCategoryStore, useFetchStore, useModalStore } from '../store/store'
import { CategoryModal } from './Modals/CategoryModal'
import CategoryTable from './components/CategoryTable'
import type { TCategoryRecord } from '../types/types'
import { SquareButton } from './components/Buttons/SquareButton'

export const MainPage = () => {

  const modalStore = useModalStore()
  const categoryStore = useCategoryStore()
  const {getEntries, getCategories} = useFetchStore()
  const [primaryCategories, setPrimaryCategories] = React.useState<TCategoryRecord[]>([])

  React.useEffect(() => {
    getEntries()
    getCategories()
  }, [])

  React.useEffect(() => {
    setPrimaryCategories(categoryStore.categories)
  }, [categoryStore.categories])


  return (
    <Flex vertical gap={50} justify='flex-start'>
      <CategoryTable categoriesData={primaryCategories}/>
      <Flex vertical gap={10}>
        <SquareButton 
          title={"Добавить запись"}
          onClick={() => modalStore.newEntry.toggleModal(true)}
        />
        <MainTable />
        <NewEntryModal />
        <CategoryModal />
      </Flex>

    </Flex>
  )
}
