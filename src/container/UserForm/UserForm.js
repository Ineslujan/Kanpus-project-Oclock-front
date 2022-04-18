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
import './userForm.scss'


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

    useEffect(() => {
        if(data){
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setPromoId(data.promo_id)
            setPromo(data.promo);
            setAdress(data.address);
            setPhone(data.phone_number);
            setEmail(data.email);
        }
        const getPromo = async () => {
            const promos = await getAllPromo (authentication.token)
            if(promos.status === 200) {
                setGetPromos(promos.data);
                console.log(promos.data);
            }
        }
        getPromo();
    }, [])
    

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

        if(!data){
            const postDatas = async () => {
                const datas = await addTrainee({
                    firstname: firstname,
                    lastname: lastname,
                    promo_id: Number(promoId),
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: "phil.jpg",
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
                const datas = await updateTrainee(data.id, {
                    firstname: firstname,
                    lastname: lastname,
                    promo_id: Number(promoId),
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: "thumbnail.png",
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
                <div className="form-wrapper">
                <form className='user-form-content' action="" onSubmit={handlerSubmit}>
                    

                        <div className="user-form-right-content">
                            <label htmlFor="promo" ><img src={svgPepole} alt="Pepole" /></label>
                            <input type="text" placeholder="Prénom" value={firstname} onChange={changeFirstName} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="promo" ><img src={svgPepole} alt="Pepole" /></label>
                            <input type="text" placeholder="Nom" value={lastname} onChange={changeLastName} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="promo" ><img src={svgMortarboard} alt="Mortarboard" /></label>
                            <select name="promo" id="promo_user" onChange={changePromo}>
                                <option key={'promo_option'} className="studends-list" value={promoId}>{promo}</option>
                            {getPromos && getPromos.map((item,index)=> (
                                <option key={index} className="studends-list" value={item.id}>{item.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="adress"><img src={svgMarker} alt="Marker" /></label>
                            <input type="text" placeholder="Adresse" name="adress" value={adress} onChange={changeAdress} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="phone"><img src={svgPhone} alt="Phone" /></label>
                            <input type="text" placeholder="Téléphone" name="phone" value={phone} onChange={changePhone} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="email"><img src={svgEnvelope} alt="Envelope" /></label>
                            <input type="text" placeholder="Email" name="email" value={email} onChange={changeEmail} />
                        </div>
                        {!data &&
                            <>
                                <div className="user-form-right-content">
                                    <label htmlFor="email"><img src={svgPepole} alt="password" /></label>
                                    <input type="text" placeholder="Mot de pass" name="email" value={newPassword} onChange={changeNewPassword} />
                                </div>
                                <div className="user-form-right-content">
                                    <label htmlFor="email"><img src={svgPepole} alt="password" /></label>
                                    <input type="text" placeholder="Confirmez le mot de passe" name="email" value={confirmNewPassword} onChange={changeConfirmNewPassword} />
                                </div>
                            </>


                            
                        }

                        <button className='trainee-confirmation-validate-button'>valider</button>
                    
                </form>
                </div>
            
            </div>
        </Modal>
    )
}
