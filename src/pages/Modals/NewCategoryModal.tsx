import { Checkbox, Form, Input, Modal } from 'antd'
import * as React from 'react'
import { useEntryStore, useFetchStore, useModalStore } from '../../store/store'
import type { ICategory } from '../../types/types'
import { setFormValue } from './utilityFunctions'

export const NewCategoryModal = () => {

  
  const {addCategory} = useFetchStore()
  const {status} = useEntryStore()
  const {newCategory: {isOpen, toggleModal, type, data}} = useModalStore()

  const initialFormState: ICategory & {categoryName?: string} = {
    name: "",
    limit: 0,
    isPrimary: false
  }
  const [formState, setFormState] = React.useState(initialFormState)
  
  const handleSubmitNewCategoryName = () => {
    addCategory(!data ? formState : {...formState, categoryName: data.categoryName}).then(() => status === "success" && toggleModal({value: false}))
  }

  const handleChangeFormState = (field: keyof ICategory, value: string | boolean) => {
    setFormValue(formState, field, value, setFormState)
  }

  React.useEffect(() => {    
    setFormState(isOpen ? {
      name: data?.name || initialFormState.name,
      limit: data?.limit || initialFormState.limit,
      isPrimary: data?.isPrimary || initialFormState.isPrimary
  } : initialFormState)
  }, [isOpen])

  return (
    <Modal
      open={isOpen}
      onCancel={() => toggleModal({value: false})}
      title={type === "edit" ? "edit category" : "new category"}
      okButtonProps={{
        onClick: () => {
          handleSubmitNewCategoryName()
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
              value={formState.isPrimary}
              onChange={() =>{
                handleChangeFormState("isPrimary", !formState.isPrimary)}}>
                is primary
              </Checkbox>
            </Form.Item>
          
        </Form>

    </Modal>)
}
