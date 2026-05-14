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
    category: {toggleModal: toggleNewCategoryModal},
    deleteConfirmation: {toggleModal: toggleDeleteCategoryModal}
  } = useModalStore()

  React.useEffect(() => {
    if (categoriesData.length){      
      setData(categoriesData)
    }
  }, [categoriesData])

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      width: "40%",
    },
    {
      title: "Лимит",
      dataIndex: "limit",
      width: "15%",
    },
    {
      title: !isSettingsTable ? "Потрачено" :  <SquareButton 
        title='Новая категория'
        onClick={() => toggleNewCategoryModal(true, {formType: "addCategory"})} />
      ,
      dataIndex: !isSettingsTable ? "currentSpent" : "edit",
      onHeaderCell: () => ({
        style: {
          display: "flex",
          justifyContent: "space-around"
        }
      }),
      width: "15%",
      render: (data:any, record: TCategoryRecord) => isSettingsTable ? <div style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        }}>
        <SquareButton
          icon={<EditOutlined/>}
          title={"Редактировать"}
          onClick={() =>  toggleNewCategoryModal(true, {formType: "editCategory", categoryData: record})}
          isTiny
        />
        <SquareButton
          icon={<DeleteOutlined />}
          title={"Удалить"}
          color='orange'
          onClick={() => toggleDeleteCategoryModal(true, {contents: record, deleteType: "delete category", deleteName: record.name, deleteFunction: (id: ICategory["id"]) => fetchStore.deleteCategory(id)})}
          isTiny
          />        
        </div>
         : data
    },
    {
      title: "Остаток",
      dataIndex: "left",
      width: "15%"
    }
  ]

  const columnsData: TableProps<TCategoryRecord>['columns'] = columns.map((col, i) => {
    
    return {
      ...col,
      key: i,
        onHeaderCell: () => ({
        style: {
          backgroundColor: "#bbdee7ff"
        }
      }),
      onCell: (record: TCategoryRecord) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title as any,
        style: {
          padding: "3px",
          paddingLeft: col.dataIndex === "edit" ? 0 : "10px",
          backgroundColor: record.isPrimary ? "#c8d9e9ff" : "#e1e7eeff",
          fontSize: "0.925rem"
        }
      })
    }
  })




  return (
    <Table 
      bordered
      dataSource={data}
      columns={!isSettingsTable ? columnsData : columnsData.slice(0,3)}
      size='small'
      style={{
        maxWidth: "40%"
      }}
      pagination={false}
      
    />
  )
  
}

export default CategoryTable
