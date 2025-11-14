import { Modal } from 'antd'
import * as React from 'react'
import { useModalStore } from '../../store/store'

export const DeleteConfirmationModal = () => {

  const {deleteConfirmation: {name, isOpen, toggleModal, data}} = useModalStore()

  // const {deleteFunction, deleteType, contents} = data;

  React.useEffect(() => {
    if (data)
    {
      // console.log("contents: ", contents);
      // deleteFunction()
      console.log("data: ", data);
      
    }
    
  }, [data])
  


  return <Modal 
    open={isOpen}
    title={"deleteType"}
    onCancel={() => toggleModal(false)}
  >
    Confirm deletion of "data"
    </Modal>
}
