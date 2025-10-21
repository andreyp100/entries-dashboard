import { Form, Input, Modal } from 'antd'
import * as React from 'react'
import type { IModalProps } from '../../types/types'
import { useFetchStore } from '../../store/store'

export const NewCategoryModal = ({isOpen, setOpenState}: IModalProps) => {

  const [name, setName] = React.useState<string>("")
  const {addCategory} = useFetchStore()

  const handleSubmitNewCategoryName = () => {
    name && addCategory(name)
  }

  React.useEffect(() => {
    setName("")
  }, [isOpen])

  return (
    <Modal
      open={isOpen}
      onCancel={() => setOpenState(false)}
      title={"new category"}
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder='name'
              />
            </Form.Item>
          
        </Form>

    </Modal>)
}
