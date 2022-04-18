import React, {useState} from 'react';
import Modal from 'react-modal';

export default function Settings({modalIsOpen, setModalIsOpen}) {
    Modal.setAppElement(document.getElementById('root'));


 
    return (
        <Modal
            isOpen={modalIsOpen}
        >
            <div className="modal-button-close">
                <div className="modal-confirmation-delete">
                    <button className="close" onClick={()=>setModalIsOpen(false)}>x</button>
                </div>
            </div>
        </Modal>
   
  )
}
