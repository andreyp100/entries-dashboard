import { Alert, Checkbox, DatePicker, Form, Input, Modal } from 'antd'
import * as React from 'react'
import { useCategoryStore, useFetchStore, useModalStore } from '../../store/store'
import { type IError, type ICategory, type IFetchStore, type ICategoryMonth } from '../../types/types'
import { setFormValue } from './utilityFunctions'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export const CategoryModal = () => {

  
  const fetchStore = useFetchStore()
  const {status} = useCategoryStore()
  const {category: {isOpen, toggleModal, data}} = useModalStore()

  const initialFormState: ICategory = {
    name: "",
    limit: 0,
    isPrimary: false,
    categoryMonth: {
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    }
    
  }
  const [formState, setFormState] = React.useState(initialFormState)
  const [error, setError] = React.useState<IError | null>(null)

  const onDateChange = (date: Dayjs) => {
    handleChangeFormState("categoryMonth",  {
      month: date.month(),
      year: date.year()
    })
  }
  
  const updateCategory = () => {
    fetchStore[`${data?.formType as keyof IFetchStore}`]({...formState, id: data?.categoryData?.id})

    .then((res) => {
      if (status === "success"){
        toggleModal(false)
      } else {
        console.log(`status not success (${status})`)}
      }
    )
    .catch((err:any) => {
      setError(err.response.data)}) 
  }


  const handleChangeFormState = (field: keyof ICategory, value: string | number | boolean | ICategoryMonth) => {
    setFormValue(formState, field, value, setFormState)
  }

  React.useEffect(() => {
    setFormState(isOpen ? {
      name: data?.categoryData?.name || initialFormState.name,
      limit: data?.categoryData?.limit || initialFormState.limit,
      isPrimary: data?.categoryData?.isPrimary || initialFormState.isPrimary,
      categoryMonth: {
        month: data?.categoryData?.categoryMonth.month || initialFormState.categoryMonth.month,
        year: data?.categoryData?.categoryMonth.year || initialFormState.categoryMonth.year,
      }
      
  } : initialFormState)
  }, [isOpen, data])
  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        toggleModal(false)
        setError(null)
      }}
      title={data?.formType === "editCategory" ? "edit category" : "new category"}
      okButtonProps={{
        onClick: () => {
          updateCategory()
        }
      }}
      width={400}
      >
        <Form
          wrapperCol={{span: 30}}
          style={{
            maxWidth: 600,
            marginTop: 30
          }}>
            <Form.Item>
              <Input 
                value={formState.name}
                onChange={(e) => {
                  handleChangeFormState("name", e.target.value);
                }}
                placeholder='name'
              />
            </Form.Item>
             <Form.Item>
              <Input 
                value={formState.limit}
                onChange={(e) => {
                  handleChangeFormState("limit", e.target.value || "0")
                }}
                placeholder='limit'
              />
            </Form.Item>
            <Form.Item>
              <DatePicker onChange={onDateChange} value={dayjs(new Date(formState.categoryMonth.year, formState.categoryMonth.month, 1))} picker="month" />
            </Form.Item>
             <Form.Item>
              <Checkbox
                checked={formState.isPrimary}
                onChange={() =>{
                  handleChangeFormState("isPrimary", !formState.isPrimary)}}>
                  is primary
                </Checkbox>
            </Form.Item>
          {error && <Alert
              message={error.message}
              type="warning"
              closable
              onClose={() => setError(null)}
            />}
        </Form>

    </Modal>)
}
