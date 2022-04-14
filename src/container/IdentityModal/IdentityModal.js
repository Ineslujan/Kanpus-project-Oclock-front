import React, { useState } from 'react';
import Modal from 'react-modal';
import Pen from '../../public/images/pen.png';
import Trash from '../../public/images/trash.png';
import { deleteUser } from '../../requests/traineeRequest';
import { requestTrainee } from '../../requests/AddClassesFormRequest';

import './identityModal.scss'
import UserForm from '../UserForm/UserForm';

export default function IdentityModal({item, modalIsOpen, closeIdentityModal, setSelectedPromo, setAllPromo, setSeeUpdateModal, getStudents}) {
    Modal.setAppElement(document.getElementById('root'));
    const [seeConfirmationModal, setSeeConfirmationModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const setUpdate = () => {
        console.log("heyhi")
        setUpdateModal(x=>!x);
        console.log(updateModal)
    }

    const confirmationModal = () => {
        setSeeConfirmationModal(modal => !modal);
    }

    const deleteStudent = async (id) => {
        const deleteOneStudent = await deleteUser(id);
            if(deleteOneStudent.status===200){
                // console.log("id",id);
                const getStudents = async () => {
                    const trainees = await requestTrainee();
                    // console.log('trainee=>',trainees.data)
                    if(trainees.status === 200){
                        setAllPromo(trainees.data);
                        setSelectedPromo(trainees.data[0]);
                        // console.log('trainee=>',trainees.data)
                    }
                }
            getStudents();
            setSeeConfirmationModal(modal => !modal);
            closeIdentityModal();
        }
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
    
                    <button className="modal-icone" onClick={setUpdate}><img src={Pen} alt="pen"/></button> 

             {updateModal && <UserForm data={item} updateModal={updateModal} setUpdate={setUpdate} setSeeUpdateModal={setSeeUpdateModal} getStudents={getStudents} closeIdentityModal={closeIdentityModal}   /> }

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
                <img className="picture" src={item.image} alt="student picture" />
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
