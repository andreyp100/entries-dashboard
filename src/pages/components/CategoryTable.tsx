import React, { useState } from 'react'
import type { ICategory, TCategoryRecord } from '../../types/types'
import { Table, type TableProps } from 'antd'
import { useFetchStore, useModalStore } from '../../store/store'
import { EditOutlined } from '@ant-design/icons'
import { SquareButton } from './Buttons/SquareButton'
import { DeleteOutlined } from '@ant-design/icons'


type TCategoriesTableProps = {
  categoriesData: TCategoryRecord[],
  isSettingsTable?: boolean
}

const CategoryTable = ({categoriesData, isSettingsTable}: TCategoriesTableProps) => {

  const [data, setData] = useState<TCategoryRecord[]>([])
  const fetchStore = useFetchStore()

  const {
    newCategory: {toggleModal: toggleNewCategoryModal},
    deleteConfirmation: {toggleModal: toggleDeleteCategoryModal}
  } = useModalStore()

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
      title: !isSettingsTable ? "current" :  <SquareButton 
        title='add category'
        onClick={() => toggleNewCategoryModal(true, {formType: "addCategory"})} />
      ,
      dataIndex: !isSettingsTable ? "current" : "edit",
      onHeaderCell: () => ({
        style: {
          display: "flex",
          justifyContent: "space-around"
        }
      }),
      width: "20%",
      render: (data:any, record: TCategoryRecord) => isSettingsTable ? <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <SquareButton
          icon={<EditOutlined/>}
          title={"edit category"}
          onClick={() =>  toggleNewCategoryModal(true, {formType: "editCategory", categoryData: {...record, originalName: record.name}})}
          isTiny
        />
        <SquareButton
          icon={<DeleteOutlined />}
          title={"delete category"}
          color='orange'
          onClick={() => toggleDeleteCategoryModal(true, {contents: record, deleteType: "delete category", deleteName: record.name, deleteFunction: (c: ICategory) => fetchStore.deleteCategory(c)})}
          isTiny
          />        
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
