import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import SettingsUpdate from '../SettingsUpdate/SettingsUpdate';
import { getSettings } from '../../requests/aboutSettings';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';

export default function Settings({modalIsOpen, setModalIsOpen}) {
    Modal.setAppElement(document.getElementById('root'));
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [settingsData, setSettingsData] = useState();
    const [updateModal, setUpdateModal] = useState();
    const [updateScreen, setUpdateScreen] = useState(false);

    console.log(updateScreen);
    useEffect(() => {
        const get = async() => {
            const data = await getSettings(authentication.token);
            if(data.status === 200){
                setSettingsData(data.data);
            }
        }
        get()
    }, []);


    useEffect(() => {
        const get = async() => {
            const data = await getSettings(authentication.token);
            if(data.status === 200){
                setSettingsData(data.data);
                setUpdateScreen(false);
            }
        }
        get()
    }, [updateScreen]);

    const seeUpdate = () => {
        setUpdateModal(x => !x);
        console.log("update");
    }
 
    return (
        <Modal
            isOpen={modalIsOpen}
            className='Modal'
            overlayClassName='Overlay'
        >
            <div className="modal-button-close">
                <div className="modal-confirmation-delete">
                    <button className="close" onClick={()=>setModalIsOpen(false)}><img src={svgCircle} alt="close-icon" /></button>
                </div>
             </div>
            {settingsData &&
                <div className="settings">
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.name}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.address}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.email}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.phone_number}</p>
                    </div>
                    <div className="settings-container">
                       {settingsData.url_image && <img src={settingsData.url_image} alt="image de l'entreprise" />}
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.course_start_hour_am}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.course_end_hour_am}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.course_start_hour_pm}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.course_end_hour_pm}</p>
                    </div>
                    <div className="settings-container">
                        <p className="settings-address">{settingsData.updatedAt}</p>
                    </div>
                </div>
            }
                <div className="identity-modal-footer">
                    <button className="update" onClick={seeUpdate}>Modifier</button>
                </div>
                {updateModal && <SettingsUpdate isOpen={updateModal} setIsOpen={setUpdateModal} seeUpdate={seeUpdate} data={settingsData} setUpdateScreen={setUpdateScreen} /> }
 
        </Modal>
   
  )
}
