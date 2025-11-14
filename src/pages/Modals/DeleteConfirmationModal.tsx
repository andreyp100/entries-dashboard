import { Alert, Modal } from 'antd'
import { useModalStore } from '../../store/store'
import { AxiosError } from 'axios'
import { useState } from 'react'

export const DeleteConfirmationModal = () => {

  const {deleteConfirmation: {isOpen, toggleModal, data}} = useModalStore()
  const [error, setError] = useState<AxiosError | null>(null)
  const handleDelete = () => {
    if (data){

      const {deleteFunction, contents} = data;
      console.log("contents: ", contents);
      try {
        return deleteFunction(contents)
      } catch (err: any) {
        console.log("delete err: ", err);
        
        setError(error)
      }
      }
       
  }
  


  return <Modal 
    open={isOpen}
    title={data?.deleteType}
    okButtonProps={{onClick: () => handleDelete().catch((err:any) => {
      setError(err)
      console.log('delete err: ', err)
    })}}
    onCancel={() => toggleModal(false)}
  >
    Confirm deletion of {data?.deleteName}
     {error && <Alert
              message={error.message}
              type="warning"
              // closable
              // onClose={() => setError(null)}
            />}
    </Modal>
}
