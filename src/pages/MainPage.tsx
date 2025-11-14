import * as React from 'react'
import {Button, Flex} from 'antd'
import MainTable from './components/MainTable'
import {PlusOutlined} from '@ant-design/icons'
import { NewEntryModal } from './Modals/NewEntryModal'
import { useCategoryStore, useEntryStore, useFetchStore, useModalStore } from '../store/store'
import { NewCategoryModal } from './Modals/NewCategoryModal'
import CategoryTable from './components/CategoryTable'
import type { TCategoryRecord } from '../types/types'
import { SquareButton } from './components/Buttons/SquareButton'

export const MainPage = () => {

  const entryStore = useEntryStore()
  const modalStore = useModalStore()
  const categoryStore = useCategoryStore()
  const {getEntries, getCategories} = useFetchStore()
  const [primaryCategories, setPrimaryCategories] = React.useState<TCategoryRecord[]>([])

  React.useEffect(() => {
    getEntries()
    getCategories()
    if (entryStore.status !== "loading"){
    }
  }, [])

  React.useEffect(() => {
    setPrimaryCategories(categoryStore.categories)
  }, [categoryStore.categories])


  return (
    <Flex vertical gap={50} justify='flex-start'>
      <CategoryTable categoriesData={primaryCategories}/>
      <Flex vertical gap={10}>
        <SquareButton 
          title={"add entry"}
          onClick={() => modalStore.newEntry.toggleModal({value: true})}
        />
        <MainTable />
        <NewEntryModal />
        <NewCategoryModal />
      </Flex>

    </Flex>
  )
}
