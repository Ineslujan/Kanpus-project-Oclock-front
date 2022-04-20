import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import { updateAdminPassword } from '../../requests/passwordAdmin';
import { AuthenticationContext } from '../../context/authenticationContext';

export default function ModalPassword({ passwordModal, seePasswordModal, item }) {

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
        console.log(item)
        const update = await updateAdminPassword({
            new_password: newPassword,
            repeat_password: confirmNewPassword
        }, authentication.token, item.id);
        if(update.status ===200){
            console.log("youhou")
        }
    }
    



  return (
      
        
        <Modal 
            isOpen={seePasswordModal}
        >
            <div className="modal-button-close">
                <div className="modal-confirmation-delete">
                    <button className="close" onClick={passwordModal}>x</button>
                </div>
            </div>
            <div className="modal-change-password">
                <p>Entrez le nouveau mot de passe</p>
                <input type="text" className="new-password" onChange={handleNewPassword} />
                <p>Confirmez le nouveau mot de passe</p>
                <input type="text" className="new-password" onChange={handleConfirmNewPassword} />   
            </div>
            <button className="valider" onClick={changePassword}>Valider</button>
            { errorConfirmPassword &&
                <div>
                    <p>Les mots de passe ne correspondent pas !</p>
                </div>
            }
        </Modal>
    
  )
}
