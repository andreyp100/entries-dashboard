import { Alert, Checkbox, Form, Input, Modal } from 'antd'
import * as React from 'react'
import { useCategoryStore, useFetchStore, useModalStore } from '../../store/store'
import { type IError, type ICategory, type IFetchStore } from '../../types/types'
import { setFormValue } from './utilityFunctions'

export const NewCategoryModal = () => {

  
  const fetchStore = useFetchStore()
  const {status} = useCategoryStore()
  const {newCategory: {isOpen, toggleModal, data}} = useModalStore()

  const initialFormState: ICategory & {originalName?: string} = {
    name: "",
    limit: 0,
    isPrimary: false
  }
  const [formState, setFormState] = React.useState(initialFormState)
  const [error, setError] = React.useState<IError | null>(null)
  
  const updateCategory = () => {
    fetchStore[`${data?.formType as keyof IFetchStore}`](formState)

    .then((res) => {
      if (status === "success"){
        toggleModal(false)
      } else {
        console.log(`status not success (${status})`)}
      }
    )
    .catch((err:any) => {
      console.log("err: ", err);
      
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
      originalName: data?.categoryData?.originalName || undefined
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
