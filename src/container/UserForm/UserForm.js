import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { addTrainee, getAllPromo, updateTrainee } from '../../requests/traineeRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import svgPepole from '../../assets/images/icones-bags-svg/bi-people-fill.svg';
import svgEnvelope from '../../assets/images/icones-bags-svg/bi-envelope-fill.svg';
import svgMarker from '../../assets/images/icones-bags-svg/majesticons-map-marker-area.svg';
import svgPhone from '../../assets/images/icones-bags-svg/bi-telephone-fill.svg';
import svgMortarboard from '../../assets/images/icones-bags-svg/bi-mortarboard-fill.svg';
import svgPassword from '../../assets/images/icones-bags-svg/RiLockPasswordFill.svg';
import svgImage from '../../assets/images/icones-bags-svg/bi-person-bounding-box.svg';
import svgUpload from '../../assets/images/icones-bags-svg/IcRoundFileUpload.svg';
import './userForm.scss';
import { api } from '../../requests/apiRoute'
import { uploadPic } from '../../requests/pictureRequest';

export default function UserForm({ data, updateModal, setUpdateModal, setUpdate, getStudents, closeIdentityModal }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    Modal.setAppElement(document.getElementById('root'));

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [getPromos, setGetPromos] = useState(null)
    const [promo, setPromo] = useState("");
    const [promoId, setPromoId] = useState(null)
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [picture, setPicture] = useState();
    const [showPicture, setShowPicture] = useState(false);
    const [urlPicture, setUrlPicture] = useState();
    const [errorPassword, setErrorPassword] = useState(false);

    useEffect(() => {
        if (data) {
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setPicture(data.image_thumbnail);
            setShowPicture(true);
            setUrlPicture(data.image);
            setPromoId(data.promo_id);
            setPromo(data.promo);
            setAdress(data.address);
            setPhone(data.phone_number);
            setEmail(data.email);
        }
        const getPromo = async () => {
            const promos = await getAllPromo(authentication.token)
            if (promos.status === 200) {
                setGetPromos(promos.data);
            }
        }
        getPromo();
    }, [])

    useEffect(() => {
        if(confirmNewPassword === newPassword){
            setErrorPassword(false);
        }
    }, [confirmNewPassword, newPassword])
    


    const changeFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const changeLastName = (e) => {
        setLastname(e.target.value);
    }

    const changePromo = (e) => {
        setPromoId(e.target.value);
    }

    const changeAdress = (e) => {
        setAdress(e.target.value);
    }

    const changePhone = (e) => {
        setPhone(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const changeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value);
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!data) {
            const postDatas = async () => {
                const datas = await addTrainee({
                    firstname: firstname,
                    lastname: lastname,
                    promo_id: Number(promoId),
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: picture ? picture: "thumbnail.jpg",
                    new_password: newPassword,
                    confirm_new_password: confirmNewPassword,
                }, authentication.token);
                if (datas.status === 200) {
                    getStudents();
                    setUpdate();
                }
            }
            if(newPassword !== confirmNewPassword ) {
                setErrorPassword(true);
            } else {
                postDatas();
            }
            
        } else {
            const update = async () => {
                const datas = await updateTrainee(data.id, {
                    firstname: firstname,
                    lastname: lastname,
                    promo_id: Number(promoId),
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: picture ? picture: "thumbnail.jpg",
                }, authentication.token);
                if (datas.status === 200) {
                    getStudents();
                    setUpdate();
                    closeIdentityModal();

                }
            }
            update();
        }
    }

    const uploadPicture = async () => {
        const fd = new FormData()
        fd.append('sampleFile', picture);
        const upload = await uploadPic(fd, authentication.token);
        if (upload.status === 200) {
            setPicture(upload.data.imageName)
            setUrlPicture(upload.data.imageUrl);
            setShowPicture(true);
        }
    }

    const newPicture = (e) => {
        e.preventDefault();
        setPicture(e.target.files[0])
    }

    const updateImage = () => {
        setShowPicture(false)
    }


    return (

        <Modal
            isOpen={updateModal}
            className='Modal'
            overlayClassName='Overlay'
        >
            <div className="user-form">
                <div className="modal-button-close">
                    <button onClick={setUpdate}><img src={svgCircle} alt="close-icon" /></button>
                </div>


                <form className='user-form-content' action="" onSubmit={handlerSubmit}>
                    <div className="user-form-wrapper">
                        <div className="user-form-wrapper-block">
                            <div className="user-form-avatar">
                                {!showPicture ?
                                    <>
                                        <img src={`${api}/avatar/thumbnail.jpg`} alt="avatar" />

                                    </>
                                    :
                                    <>
                                        <img src={urlPicture} alt="avatar" />
                                      
                                    </>
                                }
                            </div>
                            <div className="user-form-right-content">
                                <label htmlFor="promo" ><img className="user-form-icone" src={svgPepole} alt="Pepole" /></label>
                                <input type="text" placeholder="Prénom" value={firstname} onChange={changeFirstName} required/>
                            </div>
                            <div className="user-form-right-content">
                                <label htmlFor="promo" ><img className="user-form-icone" src={svgPepole} alt="Pepole" /></label>
                                <input type="text" placeholder="Nom" value={lastname} onChange={changeLastName} required/>
                            </div>
                            <div className="user-form-right-content">
                                <label htmlFor="promo" ><img className="user-form-icone" src={svgMortarboard} alt="Mortarboard" /></label>
                                <select name="promo" id="promo_user" onChange={changePromo} required>
                                    <option key={'promo_option'} className="studends-list" value={promoId}>{promo}</option>
                                    {getPromos && getPromos.map((item, index) => (
                                        <option key={index} className="studends-list" value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="user-form-wrapper-block">

                        <div className="user-form-right-content">
                            <label htmlFor="adress"><img className="user-form-icone" src={svgMarker} alt="Marker" /></label>
                            <input type="text" placeholder="Adresse" name="adress" value={adress} onChange={changeAdress} required />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="adress"><img className="user-form-icone" src={svgImage} alt="Marker" /></label>
                            <div className="user-form-upload-wrapper">
                            {!showPicture ?
                                    <>
                                        <input className="user-from-file" type="file" name="sampleFile" onChange={newPicture}/>
                                        <button className="user-form-upload" type="button" onClick={uploadPicture}>
                                        <img src={svgUpload} alt="upload" />
                                        </button>
                                    </>
                                    :
                                    <>
     
                                        <button className="user-form-edit-img" onClick={updateImage}>Modifier</button>
                                    </>
                                }
                          
                            </div>
                        </div>


                        <div className="user-form-right-content">
                            <label htmlFor="phone"><img className="user-form-icone" src={svgPhone} alt="Téléphone" /> </label>
                            <input type="text" name="phone" value={phone} placeholder="Numéro de téléphone" onChange={changePhone} required/>
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="email"><img className="user-form-icone" src={svgEnvelope} alt="Envelope" /></label>
                            <input type="email" placeholder="Email" name="email" value={email} onChange={changeEmail} required/>
                        </div>
                        {!data &&
                            <>
                                <div className="user-form-right-content">
                                    <label htmlFor="password"><img className="user-form-icone" src={svgPassword} alt="password" /></label>
                                    <input type="text" placeholder="Mot de passe" name="password" value={newPassword} onChange={changeNewPassword} minLength={3} />
                                </div>
                                <div className="user-form-right-content">
                                    <label htmlFor="password"></label>
                                    <input type="text" placeholder="Confirmez le mot de passe" name="password" value={confirmNewPassword} onChange={changeConfirmNewPassword} minLength={3}/>
                                </div>
                            </>

                        }
                            {errorPassword && <p className="trainee-password-error">Vos mots de passe ne correspondent pas</p> }
                        </div>


                        
                    </div>
                    <button className='trainee-confirmation-validate-button'>valider</button>
                  
                </form>

               
            </div>
        </Modal>
    )
}
