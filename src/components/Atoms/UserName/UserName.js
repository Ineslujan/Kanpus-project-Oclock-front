import React, {useState, useContext, useEffect, useRef} from 'react';
import Modal from 'react-modal';
import { AuthenticationContext } from '../../../context/authenticationContext';
import UserModalPassword from '../../UserModalPassword/UserModalPassword';
import { useNavigate } from 'react-router-dom';
import Settings from '../../Settings/Settings';

import deconnexionico from '../../../assets/images/icones-bags-svg/wpf-shutdown.svg'
import './userName.scss';

export default function UserName({ isOpen, setIsOpen }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    Modal.setAppElement(document.getElementById('root'));
    const navigate = useNavigate();

    const [userMenu, setUserMenu] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [seePasswordModal, setSeePasswordModal] = useState(false);
    const [seeSettings, setSeeSettings] = useState(false);

    const refMyMenu = useRef(null);

    const onClickOutside = () => {
        setUserMenu(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (refMyMenu.current && !refMyMenu.current.contains(event.target)) {
            onClickOutside && onClickOutside();
            console.log("clic")
          }
        };
            document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClickOutside ]);
    
    //   if(userMenu)
    //     return null;

    useEffect(() => {
        if (isOpen) {
            setUserMenu(false)
        }
    }, [isOpen])

    const openMenu = () => {
        setSeePasswordModal(false);
        setUserMenu(true);
        setIsOpen(false);
    }

    const openClose = () => {
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
             <button className="user-name" onClick={openMenu}>
                {authentication.user.firstname}
            </button>
        
            <div  className="user">
                <div ref={refMyMenu}>
                    {userMenu && 
                        <div className="user-modal">
                            <button onClick={openClose}>Gestion mot de passe</button>
                        </div>
                    }

                    {seePasswordModal &&
                        <UserModalPassword openClose={openClose} seePasswordModal={seePasswordModal} />
                    }

                    {userMenu && 
                        <div className="user-modal">
                            <button onClick={deconnexion}>Déconnexion <div><img src={deconnexionico} alt="icone deconnexion" className='icologout' /></div></button>
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

        </div>

    )
}