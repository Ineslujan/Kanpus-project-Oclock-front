import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { addFormer, getFormers, updateFormer } from '../../requests/formerRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import { uploadPic } from '../../requests/pictureRequest';
import { api } from '../../requests/apiRoute'

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
    const [classColor, setClassColor] = useState()

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
                console.log(promos.data);
            }
        }
        getPromo();
    }, [])
    
    const color = [
        {name:'color1', color:"#9C0D38"},
        {name:'color2', color:"#03B5AA"},
        {name:'color3', color:"#406E8E"},
        {name:'color4', color:"#FF8CC6"},
        {name:'color5', color:"#540D6E"},
        {name:'color6', color:"#EDD83D"},
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

    // const changePermanent = (e) => {
    //     setPermanent(e.target.value);
    //     console.log(e.target.value)
    // }

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
                console.log(firstname, lastname, picture,colorChoice, adress, phone, email, newPassword, confirmNewPassword)

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
            postDatas();
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
        // console.log("test=>", firstname, lastname, promoId, adress, phone, email)
    }

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
            setShowPicture(true);
        }
    }

    const newPicture = (e) => {
        e.preventDefault();
        setPicture(e.target.files[0])
       console.log("onchange",e.target.files[0]) 
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
                <form action="" onSubmit={handlerSubmit}>
                    <div className="user-form-name-container">
                        <input type="text" value={firstname} onChange={changeFirstName} required />
                        <input type="text" value={lastname} onChange={changeLastName} required />
                    </div>
                    <div className="user-form-main-container">

                        <div className="user-form-right-content">
                           <button type='button' style={{background: permanent?"#FF9700":"#152242"}} onClick={()=> formerStatus(true)} >Permanent</button>
                           <button type='button' style={{background: permanent?"#152242":"#FF9700"}}  onClick={()=> formerStatus(false)}>Intervenant</button>
                        </div>
                        {permanent &&
                        <div className="user-form-right-content">
                            <label htmlFor="color" >Couleur : </label>
                            <button type="button" name="color" id="color_user" style={{background: colorChoice}} ></button>
                            { color && color.map((item,index)=> (
                                <button type="button" key={index} className={item.name} value={item.color} onClick={()=>newColor(item)}></button>
                            ))}
                        </div> 
                        }

                        <div className="user-form-right-content">
                            <label htmlFor="adress">Adresse : </label>
                            <input type="text" name="adress" value={adress} onChange={changeAdress} required/>
                        </div>

                        <div className="user-form-right-content">
                        {!showPicture ?
                            <>
                                <input type="file" name="sampleFile" onChange={newPicture}/>
                                <button type="button" onClick={uploadPicture}>Uploader</button>
                            </>
                            :
                            <>
                                <img className="user-form-right-image" src={urlPicture} alt="avatar" />
                                <button onClick={updateImage}>modifier</button> 
                            </>
                        }
                        </div>

                        <div className="user-form-right-content">
                            <label htmlFor="phone">Téléphone : </label>
                            <input type="text" name="phone" value={phone} onChange={changePhone} required/>
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="email">Email : </label>
                            <input type="email" name="email" value={email} onChange={changeEmail} required minLength={3} maxLength={30} />
                        </div>
                 

                        <div className="former-form-right">

                            {!data &&
                                <div className="user-form-right-content">
                                    <div className="user-form-password">
                                        <label htmlFor="email">Mot de passe : </label>
                                        <input type="text" name="email" value={newPassword} onChange={changeNewPassword} />

                                        <label htmlFor="email">Confirmez le mot de passe : </label>
                                        <input type="text" name="email" value={confirmNewPassword} onChange={changeConfirmNewPassword} />
                                    </div>
                                </div>
                            }

                            <button>valider</button>
                        </div>
                    </div>
                </form>
            
            </div>
        </Modal>
    )
}
