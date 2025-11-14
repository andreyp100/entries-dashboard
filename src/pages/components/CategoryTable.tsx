import React, { useState } from 'react'
import type { TCategoryRecord } from '../../types/types'
import { Button, Table, type TableProps } from 'antd'
import { useModalStore } from '../../store/store'
import {PlusOutlined} from '@ant-design/icons'

type TCategoriesTableProps = {
  categoriesData: TCategoryRecord[],
  isSettingsTable?: boolean
}

const CategoryTable = ({categoriesData, isSettingsTable}: TCategoriesTableProps) => {

  const [data, setData] = useState<TCategoryRecord[]>([])

  const {newCategory: {toggleModal}} = useModalStore()

  React.useEffect(() => {
    if (categoriesData.length){
      setData(categoriesData)
    }
  }, [categoriesData])

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "60%",
    },
    {
      title: "limit",
      dataIndex: "limit",
      width: "20%",
    },
    {
      title: !isSettingsTable ? "current" :  <Button
          size='small'
          variant='solid'
          color='cyan'
          icon={<PlusOutlined />}
          onClick={() => toggleModal({value: true, type: "addCategory"})}
          />,
      dataIndex: !isSettingsTable ? "current" : "edit",
      onHeaderCell: () => ({
        style: {
          display: "flex",
          justifyContent: "space-around"
        }
      }),
      width: "20%",
      render: (data:any, record: TCategoryRecord) => isSettingsTable ? <div style={{display: "flex", justifyContent: "space-around"}}>
          <Button 
          onClick={() => {
              toggleModal({value: true, type: "editCategory", data: {...record, originalName: record.name}})
            }} 
          type='link'
          size='small'>edit</Button>
        
        </div>
         : data
    }
  ]

  const columnsData: TableProps<TCategoryRecord>['columns'] = columns.map((col, i) => {
    return {
      ...col,
      key: i,
      onCell: (record: TCategoryRecord) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title as any
      })
    }
  })




  return (
    <Table 
      bordered
      dataSource={data}
      columns={columnsData}
      size='small'
      style={{
        maxWidth: "30%"
      }}
      pagination={false}
      
    />
  )
  
}

export default CategoryTable
