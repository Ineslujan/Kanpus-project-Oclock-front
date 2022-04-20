import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';

import './modalPassword.scss'
import { updatePassword } from '../../requests/connexionRequest';
import { AuthenticationContext } from '../../context/authenticationContext';

export default function ModalPassword({ passwordModal, seePasswordModal }) {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const handleOldPassword = (e) => {
        setOldPassword(e.target.value)
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handleConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value)
    }

    useEffect(() => {
        if(newPassword !== confirmNewPassword) {
            setErrorConfirmPassword(true);
        } else {
            setErrorConfirmPassword(false);
        }
    }, [newPassword, confirmNewPassword]);

    const changePassword = async () => {
        const update = await updatePassword({
            old_password: oldPassword,
            new_password: newPassword,
            repeat_password: confirmNewPassword
        },authentication.token);
        if(update.status ===200){
            console.log("youhou")
        }
    }
    



  return (
      
        
        <Modal 
        isOpen={seePasswordModal}
        className='Modal'
        overlayClassName='Overlay'
        >
            <div className="modal-button-close">
                
                    <button className="close" ><img src={svgCircle} alt="close-icon" /></button>
                
            </div>
            <div className="modal-change-password">
                <div className="modal-change-password-wrapper">
                    <p>Entrez votre ancien mot de passe</p>
                    <input type="text" className="old-password" onChange={handleOldPassword}/>
                    <p>Entrez votre nouveau mot de passe</p>
                    <input type="text" className="new-password" onChange={handleNewPassword} />
                    <p>Confirmez votre nouveau mot de passe</p>
                    <input type="text" className="new-password" onChange={handleConfirmNewPassword} />  
                
            
            <button className="modal-change-password-valider" onClick={changePassword}>Valider</button>
            { errorConfirmPassword &&
                <div>
                    <p>Les mots de passe ne correspondent pas !</p>
                </div>
            }
            </div> 
            </div>
        </Modal>
    
  )
}
