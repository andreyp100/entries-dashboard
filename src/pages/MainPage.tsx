import * as React from 'react'
import {Button, Flex} from 'antd'
import MainTable from './components/MainTable'
import {PlusOutlined} from '@ant-design/icons'
import { NewEntryModal } from './components/NewEntryModal'
import { useEntryStore, useFetchStore } from '../store/store'

export const MainPage = () => {

  const [newEntryModalOpen, setNewEntryModalOpen] = React.useState<boolean>(false);
  const entryStore = useEntryStore()
  const {getEntries} = useFetchStore()

  React.useEffect(() => {
    getEntries()
    // if (entryStore.status !== "loading"){
    // }
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
        onClick={() => setNewEntryModalOpen(true)}
        />
      <MainTable />
      <NewEntryModal
        isOpen={newEntryModalOpen}
        setOpenState={setNewEntryModalOpen}
      />
    </Flex>
  )
}
