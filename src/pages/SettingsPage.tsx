import { Flex } from 'antd'
import React from 'react'
import CategoryTable from './components/CategoryTable'
import { useCategoryStore } from '../store/store'
import { type ICategory } from '../types/types'

export const SettingsPage = () => {

  const [categoriesData, setCategoriesData] = React.useState<ICategory[]>([])
  const {categories} = useCategoryStore()

  React.useEffect(() => {
    setCategoriesData(categories)
  }, [categories])


  return (
    <Flex vertical gap={50}>
      <CategoryTable categoriesData={categoriesData} isSettingsTable/>
    </Flex>
  )
}
