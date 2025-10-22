import * as React from 'react'
import { DatePicker, Form, Input, Modal, Select } from 'antd'
import type { IModalProps, IEntry, TNewEntry, ICategory, ICategorySelectOptions } from '../../types/types'
import { useEntryStore, useFetchStore } from '../../store/store'
import dayjs from 'dayjs'

export const NewEntryModal = ({name, isOpen, setOpenState}: IModalProps) => {

  const entryStore = useEntryStore()
  const fetchStore = useFetchStore()

  const initialFormState: TNewEntry = {
    date: Date.now(),
    name: "",
    sum: "",
    categoryName: ""
  }
  const [formState, setFormState] = React.useState<TNewEntry>(initialFormState)
  const [categorySelectOptions, setCategorySelectOptions] = React.useState<ICategorySelectOptions[]>([])

  const handleChangeFormState = (field: keyof TNewEntry, value: string | number) => {
    setFormState({
      ...formState,
      [field]: field !== "sum" ? value : parseFloat(value as string)
    })
  }

  const handleSubmitNewEntryForm = () => {
    fetchStore.addEntry(formState).then(() => entryStore.status === "success" && setOpenState(false))
  }

  React.useEffect(() => {
    setCategorySelectOptions(() => {
      return entryStore.categories.map(esc => ({
        label: esc.name,
        value: esc.name
      })) 
    })
  }, [entryStore.categories])


  React.useEffect(() => {
    setFormState(initialFormState)
  }, [isOpen])


  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setOpenState(false)
      }}
      title={name}
      okButtonProps={{
        onClick: () => {
          handleSubmitNewEntryForm()
          console.log("formState: ", formState)
        }
      }}
    >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          style={{
            maxWidth: 600,
            marginTop: 30,
          }}
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
                
                console.log("e: ", e)
                handleChangeFormState("categoryName", e)}}
              />
          </Form.Item>
        </Form>

    </Modal>
  )
}
