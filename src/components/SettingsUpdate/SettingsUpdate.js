import React, {useState, useContext} from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { putSettings } from '../../requests/aboutSettings';
import { uploadPic } from '../../requests/pictureRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import svgUpload from '../../assets/images/icones-bags-svg/IcRoundFileUpload.svg';
import './settingsUpdate.scss';

export default function SettingsUpdate({isOpen, setIsOpen, seeUpdate, data, setUpdateScreen}) {
    Modal.setAppElement(document.getElementById('root'));
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [picture, setPicture] = useState();
    const [showPicture, setShowPicture] = useState(false);
    const [urlPicture, setUrlPicture] = useState();


    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm(
        { defaultValues: { 
            name: data.name, 
            email: data.email,
            phone_number: data.phone_number,
            address: data.address,
            course_start_hour_am: data.course_start_hour_am,
            course_end_hour_am: data.course_end_hour_am,
            course_start_hour_pm: data.course_start_hour_pm,
            course_end_hour_pm: data.course_end_hour_pm
        }}
    );

    const newPicture = (e) => {
        e.preventDefault();
        setPicture(e.target.files[0])
       console.log("onchange",e.target.files[0]) 
    };


    const uploadPicture = async () => {
        console.log("picture",picture)
        const fd = new FormData()
        fd.append('sampleFile', picture);
        const upload = await uploadPic (fd, authentication.token);
        if(upload.status === 200){
            console.log("ok pour l'image")
            console.log(upload);
            setPicture(upload.data.imageName)
            setUrlPicture(upload.data.imageUrl);
            // setShowPicture(true);
        }
    };

    const onSubmit = async (data) => {
        data.url_image= picture;
        
            console.log('inside',data)
            const upload = await putSettings (data , authentication.token);
            if(upload.status === 200){
                setIsOpen(false);
                setUpdateScreen(true);
            
        }
     
    }
  return (
    <Modal
        isOpen={isOpen}
        className='Modal'
        overlayClassName='Overlay'
    >
        <div className="modal-button-close">
            <button className="close" onClick={seeUpdate}><img src={svgCircle} alt="close-icon" /></button>
        </div>  
        <form className="settings-update-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-change-settings-content">
            <div className="modal-change-settings-wrapper">
                <div className="modal-change-settings-min-block">
                    <div className="modal-change-settings-block">
                        <label htmlFor="name" className="user-settings-label">Nom de l'établissement</label> <br/>
                        <input type="text" className="settings-input" {...register("name", { required: true })} /> <br/>
                        {errors.name && <span>Vous devez rentrer un nom pour l'établissement</span>}
                    </div>
                    <div className="modal-change-settings-block">
                        <label htmlFor="email" className="user-settings-label">Email de l'établissement</label> <br/>
                        <input type="email" className="settings-input" {...register("email", { required: true })} /> <br/>
                        {errors.email && <span>Vous devez rentrer l'email de l'établissement</span>}
                    </div>
                    <div className="modal-change-settings-block">
                        <label htmlFor="phone" className="user-settings-label">Numéro de téléphone</label> <br/>
                        <input type="text" className="settings-input" {...register("phone_number", { required: true })} /> <br/>
                        {errors.phone_number && <span>Vous devez rentrer le numéro de téléphone de l'établissement</span>}
                    </div>
                    <div className="modal-change-settings-block">
                    <label htmlFor="phone" className="user-settings-label">Photos de couverture</label>
                        <div className="modal-change-settings-block-update">
                            {/* <img src={data.image_url} alt='kiiik'></img> */}
                            
                            <input className="user-from-file" type="file" name="sampleFile" onChange={newPicture}/>
                            <button className="modal-change-settings-block-upload" type="button" onClick={uploadPicture}>
                                <img className="modal-change-settings-block-img-upload" src={svgUpload} alt="upload" />
                            </button>
                        </div>
                    </div>
                    <div className="modal-change-settings-block">
                        <label htmlFor="address" className="user-settings-label">Adresse de l'établissement</label> <br/>
                        <input type="text" className="settings-input" {...register("address", { required: true })} /> <br/>
                        {errors.address && <span>Vous devez rentrer l'adresse de l'établissement</span>}
                    </div>
                </div>
                <div className="modal-change-settings-min-block">
                    <div className="modal-change-settings-min-block-hour">
                        <div className="modal-change-settings-block-hour">
                            <label htmlFor="course_start_hour_am" className="user-settings-label">Heure de début des cours du matin</label> <br/>
                            <input type="text" className="settings-input" {...register("course_start_hour_am", { required: true })} /> <br/>
                            {errors.course_start_hour_am && <span>Vous devez rentrer l'heure de début des cours du matin</span>}
                        </div>
                        <div className="modal-change-settings-block-hour">
                            <label htmlFor="course_end_hour_am" className="user-settings-label">Heure de fin des cours du matin</label> <br/>
                            <input type="text" className="settings-input" {...register("course_end_hour_am", { required: true })} /> <br/>
                            {errors.course_end_hour_am && <span>Vous devez rentrer l'heure de fin des cours du matin</span>}
                        </div>
                    </div>
                    <div className="modal-change-settings-min-block-hour">
                        <div className="modal-change-settings-block-hour">
                            <label htmlFor="course_start_hour_pm" className="user-settings-label">Heure de début des cours de l'aprés midi</label> <br/>
                            <input type="text" className="settings-input" {...register("course_start_hour_pm", { required: true })} /> <br/>
                            {errors.course_start_hour_pm && <span>Vous devez rentrer l'heure de début des cours de l'aprés midi</span>}
                        </div>
                        <div className="modal-change-settings-block-hour">
                            <label htmlFor="course_end_hour_pm" className="user-settings-label">Heure de fin des cours de l'aprés midi</label> <br/>
                            <input type="text" className="settings-input" {...register("course_end_hour_pm", { required: true })} /> <br/>
                            {errors.course_end_hour_pm && <span>Vous devez rentrer l'heure de fin des cours de l'aprés midi</span>}
                        </div>
                    </div>
                </div>
                <div className="modal-change-settings-min-block">
                    <div className="modal-change-settings-block">
                        <button className="modal-change-settings-validate-button">Valider</button>
                    </div>
                </div>
                </div>
            </div>
        </form>
    </Modal>
  )
}
