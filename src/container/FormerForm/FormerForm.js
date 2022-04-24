import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { addFormer, getFormers, updateFormer } from '../../requests/formerRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import { uploadPic } from '../../requests/pictureRequest';
import { api } from '../../requests/apiRoute'
import svgPepole from '../../assets/images/icones-bags-svg/bi-people-fill.svg';
import svgEnvelope from '../../assets/images/icones-bags-svg/bi-envelope-fill.svg';
import svgMarker from '../../assets/images/icones-bags-svg/majesticons-map-marker-area.svg';
import svgPhone from '../../assets/images/icones-bags-svg/bi-telephone-fill.svg';
import svgMortarboard from '../../assets/images/icones-bags-svg/bi-mortarboard-fill.svg';
import svgPalette from '../../assets/images/icones-bags-svg/bi-palette-fill.svg';
import svgPassword from '../../assets/images/icones-bags-svg/RiLockPasswordFill.svg';
import svgImage from '../../assets/images/icones-bags-svg/bi-person-bounding-box.svg';
import svgUpload from '../../assets/images/icones-bags-svg/IcRoundFileUpload.svg';

import './formerForm.scss'


export default function FormerForm({ data, updateModal, setUpdateModal, setUpdate, getStudents, closeIdentityModal }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    Modal.setAppElement(document.getElementById('root'));

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [getPromos, setGetPromos] = useState(null)
    const [promo, setPromo] = useState("");
    const [colorId, setColorId] = useState(null)
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [permanent, setPermanent] = useState(false)
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [picture, setPicture] = useState("thumbnail.jpg");
    const [showPicture, setShowPicture] = useState(false);
    const [urlPicture, setUrlPicture] = useState();

    const [colorChoice, setColorChoice] = useState();
    const [classColor, setClassColor] = useState();

    const [errorPassword, setErrorPassword] = useState(false);


    useEffect(() => {
        if(data){
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setColorChoice(data.color);
            setPicture(data.image_thumbnail)
            setUrlPicture(data.image)
            setPromo(data.promo);
            setAdress(data.address);
            setPhone(data.phone_number);
            setEmail(data.email);
            setShowPicture(true);
            setPermanent(data.is_permanent)
        }
        const getPromo = async () => {
            const promos = await getFormers (authentication.token)
            if(promos.status === 200) {
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
    
    const color = [
        {name:'color1', color:"#9C0D38"},
        {name:'color2', color:"#03B5AA"},
        {name:'color3', color:"#406E8E"},
        {name:'color4', color:"#FF8CC6"},
        {name:'color5', color:"#540D6E"},
        {name:'color6', color:"#CBB300"},//
        {name:'color7', color:"#023618"},
    ]

    const changeFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const changeLastName = (e) => {
        setLastname(e.target.value);
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

        if(!data){
            const postDatas = async () => { 
                const datas = await addFormer({
                    firstname: firstname,
                    lastname: lastname,
                    color: permanent? colorChoice : "#7C7C7C",  
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: picture,
                    is_permanent: permanent,
                    new_password: newPassword,
                    confirm_new_password: confirmNewPassword ,
                }, authentication.token);
                if(datas.status === 200){
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
                const datas = await updateFormer(data.id, {
                    firstname: firstname,
                    lastname: lastname,
                    color: permanent? colorChoice : "#7C7C7C",
                    address: adress,
                    phone_number: phone,
                    email: email,
                    is_permanent: permanent,
                    image: picture,
                }, authentication.token);
                if(datas.status === 200){
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
        const upload = await uploadPic (fd, authentication.token);
        if(upload.status === 200){
            setPicture(upload.data.imageName)
            setUrlPicture(upload.data.imageUrl);
            setShowPicture(true);
        }
    }

    const newPicture = (e) => {
        e.preventDefault();
        setPicture(e.target.files[0])
    }

    const newColor = (item) => {
        setColorChoice(item.color);
        setClassColor(item.name);
    };

    const updateImage = () => {
        setShowPicture(false)
    };

    const formerStatus = (value) => {
        setPermanent(value);
    }

    return (

        <Modal
            isOpen={updateModal}
            className='Modal'
            overlayClassName='Overlay'
        >
            <div className="user-form">
                <div className="modal-button-close">
                    <button className="close" onClick={setUpdate}><img src={svgCircle} alt="close-icon" /></button>
                </div>
                <form className='user-form-content' action="" onSubmit={handlerSubmit}>
                <div className="user-form-wrapper">
                        <div className="user-form-wrapper-block">
                            <div className="user-form-avatar">
                                {!showPicture ?
                                <>
                                <img  className="user-form-right-image" style={{border: `5px solid ${permanent? colorChoice : "#7C7C7C"}`}} src={`${api}/avatar/thumbnail.jpg`} alt="avatar" />

                                </>
                                :
                                <>
                                <img className="user-form-right-image" style={{border: `5px solid ${permanent? colorChoice : "#7C7C7C"}`}} src={urlPicture} alt="avatar" />
                                    
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


                        </div>
                        <div className="user-form-wrapper-block">
                        <div className="user-form-right-content">
                            <label htmlFor="promo" ><img className="user-form-icone" src={svgMortarboard} alt="Pepole" /></label>
                            <div className="user-form-color-wrapper">
                                <button className='former-is-permanent-button' type='button' style={{border: `2px solid ${permanent?"#FF9700":"#F3F2F2"}`,color: permanent?"#FF9700":"#F3F2F2"}} onClick={()=> formerStatus(true)} >Permanent</button>
                                <button className='former-is-permanent-button' type='button' style={{border: `2px solid ${permanent?"#F3F2F2":"#FF9700"}`, color: permanent?"#F3F2F2":"#FF9700"}}  onClick={()=> formerStatus(false)}>Intervenant</button>
                            </div>
                            </div>
                        {permanent &&
                            <div className="user-form-right-content">
                                <label htmlFor="promo" ><img className="user-form-icone" src={svgPalette} alt="Pepole" /></label>
                                <div className="user-form-color-wrapper">
                                { color && color.map((item,index)=> (
                                <button type="button" key={index} className={item.name} value={item.color} onClick={()=>newColor(item)}></button>
                                ))}
                                </div>
                            </div> 
                            }
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
                                <input type="text" name="phone" value={phone} onChange={changePhone} required/>
                            </div>
                            <div className="user-form-right-content">
                                <label htmlFor="email"><img className="user-form-icone" src={svgEnvelope} alt="Envelope" /></label>
                                <input type="email" placeholder="Email" name="email" value={email} onChange={changeEmail} required/>
                            </div>

                        {!data &&
                            <>
                                <div className="user-form-right-content">
                                    <label htmlFor="password"><img className="user-form-icone" src={svgPassword} alt="password" /></label>
                                    <input type="text" placeholder="Mot de pass" name="password" value={newPassword} onChange={changeNewPassword} minLength={3}/>
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

                {/* -- */}
                    <button className='trainee-confirmation-validate-button'>valider</button>
                </form>
            
            </div>
        </Modal>
    )
}
