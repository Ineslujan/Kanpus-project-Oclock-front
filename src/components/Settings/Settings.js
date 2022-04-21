import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import SettingsUpdate from '../SettingsUpdate/SettingsUpdate';
import { getSettings } from '../../requests/aboutSettings';
import { AuthenticationContext } from '../../context/authenticationContext';

export default function Settings({modalIsOpen, setModalIsOpen}) {
    Modal.setAppElement(document.getElementById('root'));
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [settingsData, setSettingsData] = useState();
    const [updateModal, setUpdateModal] = useState();

    useEffect(() => {
        const get = async() => {
            const data = await getSettings(authentication.token);
            if(data.status ===200){
                setSettingsData(data.data)
            }
            console.log(data)
        }
        get()
    }, []);

    const seeUpdate = () => {
        setUpdateModal(x => !x)
        console.log("update")
    }
 
    return (
        <Modal
            isOpen={modalIsOpen}
        >
            <div className="modal-button-close">
                <div className="modal-confirmation-delete">
                    <button className="close" onClick={()=>setModalIsOpen(false)}>x</button>
                </div>
                <div className="modal-confirmation-update">
                    <button className="update" onClick={seeUpdate}>x</button>
                </div>
                {updateModal && <SettingsUpdate isOpen={updateModal} seeUpdate={seeUpdate} data={settingsData} /> }
            </div>
            {settingsData&&
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
                        <img src={settingsData.url_image} alt="image de l'entreprise" />
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
        </Modal>
   
  )
}
