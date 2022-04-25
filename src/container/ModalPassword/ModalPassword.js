import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { updateAdminPassword } from '../../requests/passwordAdmin';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';

import './modalPassword.scss'
import { AuthenticationContext } from '../../context/authenticationContext';

export default function ModalPassword({ passwordModal, seePasswordModal, setSeePasswordModal, item }) {

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    const [passwordIsToShort, setpasswordIsToShort] = useState(false);

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

        if(confirmNewPassword.length > 0) {
            if(confirmNewPassword.length  > 2 && newPassword.length > 2){
                setpasswordIsToShort(false);
            } else {
                setpasswordIsToShort(true);
            }
        } else {
            setpasswordIsToShort(false);
        }
    }, [newPassword, confirmNewPassword]);

    const changePassword = async () => {
        if(!passwordIsToShort) {
            const update = await updateAdminPassword({
                new_password: newPassword,
                repeat_password: confirmNewPassword
            }, authentication.token, item.id);
            if (update.status === 200) {
                setSeePasswordModal(false);
            }
        }
    }




    return (


        <Modal
            isOpen={seePasswordModal}
            className='Modal'
            overlayClassName='Overlay'
        >
            <div className="modal-button-close">

                <button className="close" onClick={passwordModal}><img src={svgCircle} alt="close-icon" /></button>

            </div>
            <div className="modal-change-password-wrapper">
                <p>Entrez le nouveau mot de passe</p>
                <input type="passsword" className="new-password" onChange={handleNewPassword} />
                <p>Confirmez le nouveau mot de passe</p>
                <input type="passsword" className="new-password" onChange={handleConfirmNewPassword} />
            </div>
            <button className="modal-change-password-valider" onClick={changePassword}>Valider</button>
            {errorConfirmPassword &&
                <div>
                    <p>Les mots de passe ne correspondent pas !</p>
                </div>
            }
            { passwordIsToShort &&
                    <div>
                        <p>le mot de passe doit faire minimum 3 caractères</p>
                    </div>
            }

        </Modal>

    )
}
