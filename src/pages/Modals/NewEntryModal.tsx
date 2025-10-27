import * as React from 'react'
import { DatePicker, Form, Input, Modal, Select } from 'antd'
import type { TNewEntry, ICategorySelectOptions } from '../../types/types'
import { useCategoryStore, useEntryStore, useFetchStore, useModalStore } from '../../store/store'
import dayjs from 'dayjs'
import { setFormValue } from './utilityFunctions'

export const NewEntryModal = () => {

  const entryStore = useEntryStore()
  const fetchStore = useFetchStore()
  const {categories} = useCategoryStore()
  const {newEntry: {name, isOpen, toggleModal}} = useModalStore();

  const initialFormState: TNewEntry = {
    date: Date.now(),
    name: "",
    sum: "",
    categoryName: ""
  }
  const [formState, setFormState] = React.useState<TNewEntry>(initialFormState)
  const [categorySelectOptions, setCategorySelectOptions] = React.useState<ICategorySelectOptions[]>([])

  const handleChangeFormState = (field: keyof TNewEntry, value: string | number) => {    
    setFormValue(formState, field, value, setFormState)
  }

  const handleSubmitNewEntryForm = () => {
    fetchStore.addEntry(formState).then(() => entryStore.status === "success" && toggleModal({value: false}))
  }

  // React.useEffect(() => {
  //   setCategorySelectOptions(() => {
  //     return categories.map(esc => ({
  //       label: esc.name,
  //       value: esc.name
  //     })) 
  //   })
  // }, [])


  React.useEffect(() => {
    setFormState(initialFormState)
    setCategorySelectOptions(() => {
      return categories.map((esc, i) => ({
        label: esc.name,
        value: `${esc.name}`,
        key: i
      })) 
    })
  }, [isOpen])


  return (
    <Modal
      open={isOpen}
      onCancel={() => toggleModal({value: false})}
      title={name}
      okButtonProps={{
        onClick: () => handleSubmitNewEntryForm()
      }}
    >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          style={{ maxWidth: 600, marginTop: 30}}
        >
          <Form.Item label="date">
            <DatePicker 
              value={dayjs(formState.date)}
              onChange={(_, dateString) => {
                const newDate = new Date(dateString as string).getTime()
                handleChangeFormState("date", newDate)
              }}
            />
          </Form.Item>
          <Form.Item label="name">
            <Input 
              onChange={(e) => {
                handleChangeFormState("name", e.target.value)
              }}
              value={formState.name}
              />
          </Form.Item>
          <Form.Item label="sum">
            <Input 
              onChange={(e) => {
                handleChangeFormState("sum", e.target.value)
              }}
              value={formState.sum}
              />
          </Form.Item>
          <Form.Item label="category">
            <Select 
              options={categorySelectOptions}
              onChange={(e) =>{ 
                handleChangeFormState("categoryName", e)}}
              />
          </Form.Item>
        </Form>

    </Modal>
  )
}
