import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { addFormer, getFormers, updateFormer } from '../../requests/formerRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import { uploadPic } from '../../requests/pictureRequest';

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
    const [permanent, setPermanent] = useState(true)
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [picture, setPicture] = useState();
    const [showPicture, setShowPicture] = useState(false);
    const [urlPicture, setUrlPicture] = useState();

    const [colorChoice, setColorChoice] = useState();
    const [classColor, setClassColor] = useState()

    useEffect(() => {
        if(data){
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setColorChoice(data.color);
            setPicture(data.image)
            setPromo(data.promo);
            setAdress(data.address);
            setPhone(data.phone_number);
            setEmail(data.email);
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
        {name:'color7', color:"#7C7C7C"},
        {name:'color8', color:"#023618"}
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

    const changePermanent = (e) => {
        setPermanent(e.target.value);
        console.log(e.target.value)
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
                console.log(firstname, lastname, colorChoice, adress, phone, email, newPassword, confirmNewPassword)
                const datas = await addFormer({
                    firstname: firstname,
                    lastname: lastname,
                    color: colorChoice,  
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: picture,
                    is_permanent: true,
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
                    color:  colorChoice,
                    address: adress,
                    phone_number: phone,
                    email: email,
                    is_permanent: true,
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
        const upload = await uploadPic (fd);
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
        setClassColor(item.name)
    }

    return (

        <Modal
            isOpen={updateModal}
        >
            <div className="user-form">
                <div className="modal-button-close">
                    <button className="close" onClick={setUpdate}>x</button>
                </div>
                <form action="" onSubmit={handlerSubmit}>
                    <div className="user-form-name-container">
                        <input type="text" value={firstname} onChange={changeFirstName} />
                        <input type="text" value={lastname} onChange={changeLastName} />
                    </div>
                    <div className="user-form-main-container">

                        <div className="user-form-right-content">
                            <label htmlFor="color" >Couleur : </label>
                            <button type="button" name="color" id="color_user" className={classColor}></button>
                            {color && color.map((item,index)=> (
                                <button type="button" key={index} className={item.name} value={item.color} onClick={()=>newColor(item)}></button>
                            ))}
                            
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="adress">Adresse : </label>
                            <input type="text" name="adress" value={adress} onChange={changeAdress} />
                        </div>

                        <div className="user-form-right-content">
                        {!showPicture ?
                            <>
                                <input type="file" name="sampleFile" onChange={newPicture}/>
                                <button type="button" onClick={uploadPicture}>Uploader</button>
                            </>
                            :
                            <img src={urlPicture} alt="avatar" />  }
                        </div>

                        <div className="user-form-right-content">
                            <label htmlFor="phone">Téléphone : </label>
                            <input type="text" name="phone" value={phone} onChange={changePhone} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="email">Email : </label>
                            <input type="text" name="email" value={email} onChange={changeEmail} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="is_permanent">Permanent : 
                                <input type="radio" id="is_permanent" name="is-permanent" value="permanent" onClick={changePermanent} />
                            </label>
                            <label htmlFor="not-permanent">Non permanent : 
                                <input type="radio" id="not-permanent" name="is-permanent" value="non-permanent" onClick={changePermanent} />
                            </label>
                        </div>
               
                   
                      
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
                </form>
            
            </div>
        </Modal>
    )
}
