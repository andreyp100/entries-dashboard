import React, { useState } from 'react'
import type { ICategory, TCategoryRecord } from '../../types/types'
import { Button, Table, type TableProps } from 'antd'
import { useModalStore } from '../../store/store'

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
      title: !isSettingsTable ? "current" : "",
      dataIndex: !isSettingsTable ? "current" : "edit",
      width: "20%",
      render: (data:any, record: TCategoryRecord) => isSettingsTable ? <Button 
        onClick={() => {
          toggleModal({value: true, type: "edit", data: record})
          console.log("record: ", record)}} 
        type='link' size='small'>edit</Button> : data
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
