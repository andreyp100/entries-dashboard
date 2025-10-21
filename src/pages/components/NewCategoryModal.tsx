import { Form, Input, Modal } from 'antd'
import * as React from 'react'
import type { IModalProps } from '../../types/types'

export const NewCategoryModal = ({isOpen, setOpenState}: IModalProps) => {

  const [name, setName] = React.useState<string>("")

  const handleSubmitNewCategoryName = () => {

  }

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
      >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 14}}
          style={{
            maxWidth: 600,
            marginTop: 30
          }}>
            <Form.Item label="name">
              <Input 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
          
        </Form>

    </Modal>)
}
