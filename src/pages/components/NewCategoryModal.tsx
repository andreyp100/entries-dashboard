import { Checkbox, Form, Input, Modal } from 'antd'
import * as React from 'react'
import type { IModalProps } from '../../types/types'
import { useFetchStore } from '../../store/store'

export const NewCategoryModal = ({isOpen, setOpenState}: IModalProps) => {

  const [isPrimary, setIsPrimary] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("")
  const {addCategory} = useFetchStore()

  const handleSubmitNewCategoryName = () => {
    name && addCategory({name, isPrimary})
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
             <Form.Item>
              <Checkbox onChange={() => setIsPrimary(!isPrimary)}>
                is primary
              </Checkbox>
            </Form.Item>
          
        </Form>

    </Modal>)
}
