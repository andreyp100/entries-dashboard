import * as React from 'react'
import {Button, Flex} from 'antd'
import MainTable from './components/MainTable'
import {PlusOutlined} from '@ant-design/icons'
import { NewEntryModal } from './components/NewEntryModal'
import { useEntryStore, useFetchStore, useModalStore } from '../store/store'
import { NewCategoryModal } from './components/NewCategoryModal'

export const MainPage = () => {

  const entryStore = useEntryStore()
  const modalStore = useModalStore()
  const {getEntries, getCategories} = useFetchStore()

  React.useEffect(() => {
    getEntries()
    getCategories()
    if (entryStore.status !== "loading"){
    }
  }, [])


  return (
    <Flex vertical gap={10}>
      <Button 
        style={{
          maxWidth: "5vw",
        }}
        variant='solid'
        color='cyan'
        icon={<PlusOutlined />}
        onClick={() => modalStore.newEntry.setOpenState(true)}
        />
      <MainTable />
      <NewEntryModal
        name="newEntry"
        isOpen={modalStore.newEntry.isOpen}
        setOpenState={modalStore.newEntry.setOpenState}
      />
      <NewCategoryModal 
        name="newCategory"
        isOpen={modalStore.newCategory.isOpen}
        setOpenState={modalStore.newCategory.setOpenState}
      />
    </Flex>
  )
}
