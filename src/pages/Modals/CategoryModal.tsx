import { Alert, Checkbox, DatePicker, Form, Input, Modal } from 'antd'
import * as React from 'react'
import { useCategoryStore, useFetchStore, useModalStore } from '../../store/store'
import { type IError, type ICategory, type IFetchStore } from '../../types/types'
import { setFormValue } from './utilityFunctions'
import type { Dayjs } from 'dayjs'

export const CategoryModal = () => {

  
  const fetchStore = useFetchStore()
  const {status} = useCategoryStore()
  const {category: {isOpen, toggleModal, data}} = useModalStore()

  const initialFormState: ICategory = {
    name: "",
    limit: 0,
    isPrimary: false,
  }
  const [formState, setFormState] = React.useState(initialFormState)
  const [error, setError] = React.useState<IError | null>(null)

  const onDateChange = (date: Dayjs) => {
    console.log("month: ", date.month());
    
    let isDecember = date.month() === 11

    const categoryDatesRange = {
      from: new Date(`${date.year()}, ${date.month() + 1}, 19`).getTime(),
      to: new Date(`${date.year() + Number(isDecember)}, ${!isDecember ? date.month() + 2 : 1}, 19`).getTime() - 1
    }
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


  const handleChangeFormState = (field: keyof ICategory, value: string | boolean) => {
    setFormValue(formState, field, value, setFormState)
  }

  React.useEffect(() => {
    setFormState(isOpen ? {
      name: data?.categoryData?.name || initialFormState.name,
      limit: data?.categoryData?.limit || initialFormState.limit,
      isPrimary: data?.categoryData?.isPrimary || initialFormState.isPrimary,
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
              <DatePicker onChange={onDateChange} picker="month" />
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
