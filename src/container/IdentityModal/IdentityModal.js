import React, { useState } from 'react';
import Modal from 'react-modal';
import Pen from '../../public/images/pen.png';
import Trash from '../../public/images/trash.png';
import {Link} from 'react-router-dom';

import './identityModal.scss'

export default function IdentityModal({item, modalIsOpen, closeIdentityModal}) {
    Modal.setAppElement(document.getElementById('root'));
    const [seeConfirmationModal, setSeeConfirmationModal] = useState(false);

    const confirmationModal = () => {
        setSeeConfirmationModal(modal => !modal)
    }

  return (
    <div>
        <Modal
            isOpen={modalIsOpen}
        >
            <div className="modal-button-close">
                <button className="close" onClick={closeIdentityModal}>x</button>
            </div>
            <div className="identity-modal-container">
            <div className="modal-icones">
            
            <Link to="/add" state={{item}}>
                    <button className="modal-icone"><img src={Pen} alt="pen"/></button> 
            </Link>
             <button className="modal-icone" onClick={confirmationModal}><img src={Trash} alt="trash" /></button>

             <Modal isOpen={seeConfirmationModal} >
                 <div className="modal-button-close">
                     <div className="modal-confirmation-delete">
                         <button className="close" onClick={confirmationModal}>x</button>
                     </div>
                 </div>
                 <div className="modal-confirmation-delete-button">
                     <div className="modal-confirmation-title">
                         <p>Voulez-vous vraiment supprimer cet élève ?</p>
                     </div>
                     <div className="modal-confirmation-delete-response">
                         <button className="modal-confirmation-response" onClick={confirmationModal}>Non</button>
                         <button className="modal-confirmation-response" onClick={()=> deleteStudent(item.id) }>Oui</button>
                     </div>
                 </div>
             </Modal>

         </div>


                <div className="identity-modal-container-name">
                    <span className="identity-modal-name">{item.firstname}</span> <span className="identity-modal-name">{item.lastname}</span>
                </div>
                <img className="picture" src="" alt="" />
                <p className="identity-modal-promo">{item.promo}</p>
                <div className="identity-modal-container-adress">
                    <p className="adress-title">Adress :</p>
                    <p className="adress-content"> {item.address} </p>
                </div>
                <div className="identity-modal-container-phone">
                    <p className="phone-title">Téléphone :</p>
                    <p className="phone-content"> {item.phone_number} </p>
                </div>
                <div className="identity-modal-container-mail">
                    <p className="mail-title">Email :</p>
                    <p className="mail-content"> {item.email} </p>
                </div>
                
            </div>

        </Modal>
        {console.log(item)}
    </div>
  )
}
