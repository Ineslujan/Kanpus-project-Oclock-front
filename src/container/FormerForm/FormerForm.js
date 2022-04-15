import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addFormer, getFormers, updateFormer } from '../../requests/formerRequest';


export default function FormerForm({ data, updateModal, setUpdateModal, setUpdate, getStudents, closeIdentityModal }) {

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

    useEffect(() => {
        if(data){
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setColorId(data.color)
            setPromo(data.promo);
            setAdress(data.address);
            setPhone(data.phone_number);
            setEmail(data.email);
        }
        const getPromo = async () => {
            const promos = await getFormers ()
            if(promos.status === 200) {
                setGetPromos(promos.data);
                console.log(promos.data);
            }
        }
        getPromo();
    }, [])
    
    const color = [
        {name: "red", number:'#269987'},
        {name: "bleu", number:'#269987'},
        {name: "vert", number:'#269987'},
        {name: "jaune", number:'#269987'},
        {name: "orange", number:'#269987'},
        {name: "cyan", number:'#269987'},
        {name: "violet", number:'#269987'},
        {name: "noir", number:'#269987'},]

    const changeFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const changeLastName = (e) => {
        setLastname(e.target.value);
    }

    const changeColor = (e) => {
        setColorId(e.target.value);
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
                const datas = await addFormer({
                    firstname: firstname,
                    lastname: lastname,
                    color: colorId.number,  
                    address: adress,
                    phone_number: phone,
                    email: email,
                    image: "phil.jpg",
                    is_permanent: true,
                    new_password: newPassword,
                    confirm_new_password: confirmNewPassword ,
                });
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
                    color: colorId,
                    address: adress,
                    phone_number: phone,
                    email: email,
                    is_permanent: true,
                    image: "thumbnail.png",
                });
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
                            <label htmlFor="color" >Couleur : </label>
                            <select name="color" id="color_user" onChange={changeColor}>
                                <option key={'jdfjdjkfddddjdf'} className="studends-list" value={color.number}>{color.name}</option>
                            {color && color.map((item,index)=> (
                                <option key={index} className="studends-list" value={item.number}>{item.name}</option>
                            ))}
                            </select>
                        </div>
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
                        <div className="user-form-right-content">
                            <label htmlFor="is_permanent">Permanent : 
                                <input type="radio" id="is_permanent" name="is-permanent" value="permanent" onChange={changePermanent} />
                            </label>
                            <label htmlFor="not-permanent">Non permanent : 
                                <input type="radio" id="not-permanent" name="is-permanent" checked value="non-permanent" onChange={changePermanent} />
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
