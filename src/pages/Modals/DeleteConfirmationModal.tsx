import { Alert, Modal } from 'antd'
import { useModalStore } from '../../store/store'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

export const DeleteConfirmationModal = () => {

  const {deleteConfirmation: {isOpen, toggleModal, data}} = useModalStore()
  const [error, setError] = useState<AxiosError | null>(null)
  const handleDelete = () => {
    if (data){

      const {deleteFunction, contents} = data;
      try {
        return deleteFunction(contents.id).then(() => toggleModal(false))
      } catch (err: any) {
        setError(error)
      }
      }
       
  }

  useEffect(() => {
    if (!isOpen){
      setError(null)
    }
  }, [isOpen])
  


  return <Modal 
    open={isOpen}
    title={data?.deleteType}
    okButtonProps={{onClick: () => handleDelete().catch((err:any) => {
      setError(err)
      console.log('delete err: ', err)
    })}}
    onCancel={() => {
      toggleModal(false)
    }}
  >
    Confirm deletion of {data?.deleteName}
     {error && <Alert
              message={error.message}
              type="warning"
            />}
    </Modal>
}
