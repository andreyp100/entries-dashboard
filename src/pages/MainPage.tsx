import * as React from 'react'
import {Button, Flex} from 'antd'
import MainTable from './components/MainTable'
import {PlusOutlined} from '@ant-design/icons'
import { NewEntryModal } from './Modals/NewEntryModal'
import { useEntryStore, useFetchStore, useModalStore } from '../store/store'
import { NewCategoryModal } from './Modals/NewCategoryModal'
import CategoryTable from './components/CategoryTable'
import type { TCategoryRecord } from '../types/types'

export const MainPage = () => {

  const entryStore = useEntryStore()
  const modalStore = useModalStore()
  const {getEntries, getCategories} = useFetchStore()
  const [primaryCategories, setPrimaryCategories] = React.useState<TCategoryRecord[]>([])

  React.useEffect(() => {
    getEntries()
    getCategories()
    if (entryStore.status !== "loading"){
    }
  }, [])

  React.useEffect(() => {
    setPrimaryCategories(entryStore.categories)
  }, [entryStore.categories])


  return (
    <Flex vertical gap={50} justify='flex-start'>
      <CategoryTable categoriesData={primaryCategories}/>
      <Flex vertical gap={10}>
        <Button 
          style={{
            maxWidth: "5vw",
          }}
          variant='solid'
          color='cyan'
          icon={<PlusOutlined />}
          onClick={() => modalStore.newEntry.toggleModal({value: true})}
          />
        <MainTable />
        <NewEntryModal />
        <NewCategoryModal />
      </Flex>

    </Flex>
  )
}
