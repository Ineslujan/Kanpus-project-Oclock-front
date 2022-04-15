import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { addTrainee, getAllPromo, updateTrainee } from '../../requests/traineeRequest';
import { AuthenticationContext } from '../../context/authenticationContext';

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
                            <label htmlFor="promo" >Promo : </label>
                            <select name="promo" id="promo_user" onChange={changePromo}>
                                <option key={'jdfjdjkfdjdf'} className="studends-list" value={promoId}>{promo}</option>
                            {getPromos && getPromos.map((item,index)=> (
                                <option key={index} className="studends-list" value={item.id}>{item.name}</option>
                            ))}
                            </select>
                        </div>
                        {/* <div className="user-form-right-content">
                            <label htmlFor="color">Couleur : 
                            <input type="text" name="color" value={color} onChange={changeColor} />
                            </label>
                        </div> */}
                        <div className="user-form-right-content">
                            <label htmlFor="adress">Adresse : </label>
                            <input type="text" name="adress" value={adress} onChange={changeAdress} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="phone">Téléphone : </label>
                            <input type="text" name="phone" value={phone} onChange={changePhone} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="email">Email : </label>
                            <input type="text" name="email" value={email} onChange={changeEmail} />
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
