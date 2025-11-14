import { Checkbox, Form, Input, Modal } from 'antd'
import * as React from 'react'
import { useCategoryStore, useFetchStore, useModalStore } from '../../store/store'
import type { ICategory, IFetchStore } from '../../types/types'
import { setFormValue } from './utilityFunctions'

export const NewCategoryModal = () => {

  
  const fetchStore = useFetchStore()
  const {status} = useCategoryStore()
  const {newCategory: {isOpen, toggleModal, type, data}} = useModalStore()

  const initialFormState: ICategory & {originalName?: string} = {
    name: "",
    limit: 0,
    isPrimary: false
  }
  const [formState, setFormState] = React.useState(initialFormState)
  
  const updateCategory = () => {
    fetchStore[`${data?.type as keyof IFetchStore}`](formState)

    .then((res) => {
      if (status === "success"){
        console.log("status (", type, ") is: ", status);
        console.log("res: ", res)
        toggleModal(false)
      } else {
        console.log(`status not success (${status})`)}
      }
    ) 
  }

  React.useEffect(() => {
    console.log("data: ", data);
    
  }, [data])


  const handleChangeFormState = (field: keyof ICategory, value: string | boolean) => {
    setFormValue(formState, field, value, setFormState)
  }

  React.useEffect(() => {
    setFormState(isOpen ? {
      name: data?.name || initialFormState.name,
      limit: data?.limit || initialFormState.limit,
      isPrimary: data?.isPrimary || initialFormState.isPrimary,
      originalName: data?.originalName || undefined
  } : initialFormState)
  }, [isOpen, data?.data])

  return (
    <Modal
      open={isOpen}
      onCancel={() => toggleModal(false)}
      title={data?.type === "editCategory" ? "edit category" : "new category"}
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
                  handleChangeFormState("limit", e.target.value)
                }}
                placeholder='limit'
              />
            </Form.Item>
             <Form.Item>
              <Checkbox
                checked={formState.isPrimary}
                onChange={() =>{
                  handleChangeFormState("isPrimary", !formState.isPrimary)}}>
                  is primary
                </Checkbox>
            </Form.Item>
          
        </Form>

    </Modal>)
}
