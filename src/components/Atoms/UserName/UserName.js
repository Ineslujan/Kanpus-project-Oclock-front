import React, {useState,useContext,useEffect} from 'react';
import Modal from 'react-modal';
import { AuthenticationContext } from '../../../context/authenticationContext';
import ModalPassword from '../../../container/ModalPassword/ModalPassword';
import { useNavigate } from 'react-router-dom';
import Settings from '../../Settings/Settings';
import './userName.scss';

export default function UserName({ isOpen, setIsOpen }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    Modal.setAppElement(document.getElementById('root'));
    const navigate = useNavigate();

    const [userMenu, setUserMenu] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [seePasswordModal, setSeePasswordModal] = useState(false);
    const [seeSettings, setSeeSettings] = useState(false)
    
    useEffect(() => {
        if (isOpen) {
            setUserMenu(false)
        }
    }, [isOpen])

    const openMenu = () => {
        setSeePasswordModal(false);
        setUserMenu(modal => !modal);
        setIsOpen(false)
    }

    const openPassword = () => {
        setSeePasswordModal(x=>!x);
        setUserMenu(x=>!x);
        console.log("coucou")
    }

    const deconnexion = () => {
        setAuthentication("");
        navigate("/")
    }

    const settings = () => {
        setSeeSettings(x=> !x);
        setUserMenu(x=>!x);
    }


    return (

		<div className="navbar-user">
            <button className="user-name" onClick={openMenu} >
                {authentication.user.firstname}
                </button>
            {/* {console.log("user",authentication.user.firstname)} */}
            <div className="user">
            {userMenu && 
                <div className="user-modal">
                    <button onClick={openPassword}>Gestion mot de passe</button>
                </div>
            }
            {seePasswordModal &&
                 <ModalPassword openPassword={openPassword} seePasswordModal={seePasswordModal} />
            }
             {userMenu && 
                <div className="user-modal">
                    <button onClick={deconnexion}>Déconnexion</button>
                </div>
            }
                    
                    {authentication.role === "admin" &&       
                        <>  
                        {userMenu && 
                            <div className="user-modal">
                            <button onClick={settings}>Settings</button>
                            </div>
                        }
                        
                        <Settings  modalIsOpen={seeSettings} setModalIsOpen={setSeeSettings}/>
                        </> 
                    
                    
            }
        </div>

        </div>

    )
}