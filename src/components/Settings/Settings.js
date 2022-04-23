import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import SettingsUpdate from '../SettingsUpdate/SettingsUpdate';
import { getSettings } from '../../requests/aboutSettings';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import Pen from '../../assets/images/pen.png';
import { DateTime } from "luxon";
import './settings.scss'

export default function Settings({modalIsOpen, setModalIsOpen}) {
    Modal.setAppElement(document.getElementById('root'));
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [settingsData, setSettingsData] = useState();
    const [updateModal, setUpdateModal] = useState();
    const [updateScreen, setUpdateScreen] = useState();

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


    useEffect(() => {
        const get = async() => {
            const data = await getSettings(authentication.token);
            if(data.status ===200){
                console.log('allo',data);
                setSettingsData(data.data)
            }
            console.log(data)
        }
        get()
    }, [updateScreen]);

    const seeUpdate = () => {
        setUpdateModal(x => !x)
        console.log("update")
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
            {settingsData&&
                <div className="settings-wrapper-block">
                    <div className="settings-wrapper">
                    <div className="settings-block-head">
                        <div className="settings-container-img">
                        {settingsData.url_image && <img className="settings-container-image" src={settingsData.url_image} alt="image de l'entreprise" />}
                        </div>
                    </div>
                    <div className="settings-block-main">
                        <div className="settings-block">
                            <div className="settings-container-title">
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
                        </div>
                        <div className="settings-block-hour">
                            <div className="settings-block-hour-block">
                                <div className="settings-container">
                                    <p className="settings-address">AM :</p>
                                </div>
                                <div className="settings-container">
                                    <p className="settings-address">{settingsData.course_start_hour_am}</p>
                                </div>
                                <div className="settings-container">
                                    <p className="settings-address">{settingsData.course_end_hour_am}</p>
                                </div>
                            </div>
                            <div className="settings-block-hour-block">
                                <div className="settings-container">
                                    <p className="settings-address">PM :</p>
                                </div>
                                <div className="settings-container">
                                    <p className="settings-address">{settingsData.course_start_hour_pm}</p>
                                </div>
                                <div className="settings-container">
                                    <p className="settings-address">{settingsData.course_end_hour_pm}</p>
                                </div>
                            </div>
                        </div>
                        <div className="settings-container">
                                <p className="settings-address">{`Dernière modification : ${DateTime.fromISO(settingsData.updatedAt).daysInMonth} ${DateTime.fromISO(settingsData.updatedAt).monthLong} ${DateTime.fromISO(settingsData.updatedAt).weekYear}`}</p>
                        </div>
                    </div>
                    </div>
                    </div>
            }
                <div className="identity-modal-footer">
                    <button className="identity-modal-button-edit" onClick={seeUpdate}><img className="" src={Pen} alt="close-icon" /></button>
                </div>
                {updateModal && <SettingsUpdate isOpen={updateModal} setIsOpen={setUpdateModal} seeUpdate={seeUpdate} data={settingsData} setUpdateScreen={setUpdateScreen} /> }
 
        </Modal>
   
  )
}
