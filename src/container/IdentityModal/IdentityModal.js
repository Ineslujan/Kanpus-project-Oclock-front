import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import Pen from '../../assets/images/pen.png';
import Trash from '../../assets/images/trash.png';
import { deleteUser } from '../../requests/traineeRequest';
import { requestTrainee } from '../../requests/addClassesFormRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import ModalPassword from '../ModalPassword/ModalPassword';
import AbsenceModal from '../../components/AbsenceModal/AbsenceModal';


import './identityModal.scss'
import UserForm from '../UserForm/UserForm';


export default function IdentityModal({ item, modalIsOpen, closeIdentityModal, setSelectedPromo, setAllPromo, setSeeUpdateModal, getStudents }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    Modal.setAppElement(document.getElementById('root'));
    const [seeConfirmationModal, setSeeConfirmationModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [seePasswordModal, setSeePasswordModal] = useState(false);
    const [seeAbsenceModal, setSeeAbsenceModal] = useState(false);

    const setUpdate = () => {
        setUpdateModal(x => !x);
    }

    const confirmationModal = () => {
        setSeeConfirmationModal(modal => !modal);
    }

    const deleteStudent = async (id) => {
        const deleteOneStudent = await deleteUser(id, authentication.token);
        if (deleteOneStudent.status === 200) {
            const getStudents = async () => {
                const trainees = await requestTrainee(authentication.token);
                if (trainees.status === 200) {
                    setAllPromo(trainees.data);
                    setSelectedPromo(trainees.data[0]);
                }
            }
            getStudents();
            setSeeConfirmationModal(modal => !modal);
            closeIdentityModal();
        }
    };

    const passwordModal = () => {
        setSeePasswordModal(!seePasswordModal)
    };

    const absenceModal = () => {
        setSeeAbsenceModal(!seeAbsenceModal)
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                className='Modal'
                overlayClassName='Overlay'
            >
                <div className="modal-button-close">
                    <button className="close" onClick={closeIdentityModal}><img src={svgCircle} alt="close-icon" /></button>
                </div>
                <div className="identity-modal-warpper">
                    <div className="identity-modal-right">
                        <div className="identity-modal-main">


                            <img className="picture" src={item.image} alt="student picture" />

                            <div className="identity-modal-container-name">
                                <span className="identity-modal-name">{item.firstname} {item.lastname}</span>

                                <p className="identity-modal-promo">{item.promo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="identity-modal-left">
                        <div className="identity-modal-container">

                            <div className="identity-modal-container-adress">
                                <p className="identity-modal-container-title">Adresse :</p>
                                <p className="identity-modal-container-content"> {item.address} </p>
                            </div>
                            <div className="identity-modal-container-phone">
                                <p className="identity-modal-container-title">Téléphone :</p>
                                <p className="identity-modal-container-content"> {item.phone_number} </p>
                            </div>
                            <div className="identity-modal-container-mail">
                                <p className="identity-modal-container-title">Email :</p>
                                <p className="identity-modal-container-content"> {item.email} </p>
                            </div>

                        </div>

                        <div className="identity-modal-footer">

                            <button className="identity-modal-icone" onClick={setUpdate}><img src={Pen} alt="pen" /></button>

                            {updateModal && <UserForm data={item} updateModal={updateModal} setUpdate={setUpdate} setSeeUpdateModal={setSeeUpdateModal} getStudents={getStudents} closeIdentityModal={closeIdentityModal} />}

                            <button className="identity-modal-icone" onClick={confirmationModal}><img src={Trash} alt="trash" /></button>

                            <Modal
                                isOpen={seeConfirmationModal}
                                className='Modal'
                                overlayClassName='Overlay'
                            >
                                <div className="modal-button-close">
                                    
                                        <button className="close" onClick={confirmationModal}><img src={svgCircle} alt="close-icon" /></button>
                                    
                                </div>
                                <div className="modal-confirmation-delete-button">
                                <div className="modal-confirmation-delete-warp">
                                    <div className="modal-confirmation-title">
                                        <p>Voulez-vous vraiment supprimer cet élève ?</p>
                                    </div>
                                    <div className="modal-confirmation-delete-response">
                                        <button className="modal-confirmation-response" onClick={confirmationModal}>Non</button>
                                        <button className="modal-confirmation-response" onClick={() => deleteStudent(item.id)}>Oui</button>
                                    </div>
                                </div>
                                </div>
                            </Modal>

                        </div>
                    </div>
                </div>
                {authentication.role === "admin" &&
                    <div className="identity-modal-button-password-block">
                        <button className="identity-modal-button-password" onClick={passwordModal}>Changez le mot de passe</button>
                    </div>
                }
          
                <ModalPassword passwordModal={passwordModal} seePasswordModal={seePasswordModal} setSeePasswordModal={setSeePasswordModal} item={item} />
                <div className="identity-modal-absence">
                    <button className="identity-modal-button-password" onClick={absenceModal}>Voir les absences</button>
                </div>
                <AbsenceModal absenceModal={absenceModal} seeAbsenceModal={seeAbsenceModal} setSeeAbsenceModal={setSeeAbsenceModal} item={item} />
        </Modal>
       
    </div>
  )
}
