import * as React from 'react'
import {Button, Flex} from 'antd'
import MainTable from './components/MainTable'
import {PlusOutlined} from '@ant-design/icons'
import { NewEntryModal } from './components/NewEntryModal'

export const MainPage = () => {

  const [newEntryModalOpen, setNewEntryModalOpen] = React.useState<boolean>(false);


  return (
    <Flex vertical gap={10}>
      <Button 
        style={{
          maxWidth: "5vw",
        }}
        // type='primary'
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
