import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { deleteProduct } from '../../api/ApiProduct';

export default function ModalConfirm({idproduct,onDeleteProduct, actionModal}) {
    console.log(idproduct)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(`Do you want to ${actionModal} this product?`);

    const deleteMutation = useMutation(
        async (payload: any) => await deleteProduct(payload),
        {
          onSettled: async (data: any) => {
            if(data.status === "success") {
                message.success("Delete product successfully")
            } else {
                message.error("Something went wrong, please try again!")
            }
            onDeleteProduct()
          }
        }
    )
    useEffect(()=> {
        if(idproduct !== '')
        setOpen(true)
    }, [idproduct])
    const handleOk = () => {
        deleteMutation.mutate({id: idproduct})
        setModalText('Your request will be done in seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        setOpen(false);
      };
  return (
    <div>
         <Modal
          title="Confirm"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
    </div>
  )
}
