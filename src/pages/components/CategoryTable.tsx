import React, { useState } from 'react'
import type { TCategoryRecord } from '../../types/types'
import { Table, type TableProps } from 'antd'

type TCategoriesTableProps = {
  categoriesData: TCategoryRecord[],
  isSettingsTable?: boolean
}

const CategoryTable = ({categoriesData, isSettingsTable}: TCategoriesTableProps) => {

  const [data, setData] = useState<TCategoryRecord[]>([])

  React.useEffect(() => {
    if (categoriesData.length){
      setData(categoriesData)
    }
  }, [categoriesData])

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "limit",
      dataIndex: "limit",
      width: "30%",
    },
    {
      title: "currentSpent",
      dataIndex: "currentSpent",
      width: "30%",
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
      columns={!isSettingsTable ? columnsData : columnsData.slice(0,2)}
      size='small'
      style={{
        maxWidth: "40%"
      }}
      pagination={false}
      
    />
  )
  
}

export default CategoryTable
