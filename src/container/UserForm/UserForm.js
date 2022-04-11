import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addTrainee } from '../../requests/traineeRequest';

export default function UserForm({ data, seeUpdateModal, setUpdate }) {

    Modal.setAppElement(document.getElementById('root'));

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [promo, setPromo] = useState("");
    const [color, setColor] = useState("");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submit, setSubmit] = useState(null);

    useEffect(() => {
        if(data){
            console.log("data in userForm=>", data);
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setPromo(data.promo);
            setColor(data.color);
            setAdress(data.address);
            setPhone(data.phone_number);
            setEmail(data.email);
        }
    }, [])
    

    const changeFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const changeLastName = (e) => {
        setLastname(e.target.value);
    }

    const changePromo = (e) => {
        setPromo(e.target.value);
    }

    const changeColor = (e) => {
        setColor(e.target.value);
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

    const handlerSubmit = (e) => {
        e.preventDefault();
        setSubmit({
            firstname: firstname,
            lastname: lastname,
            promo: promo,
            color: color,
            adress: adress,
            phone: phone,
            email: email,
        })
        const postDatas = async () => {
            const datas = await addTrainee({
                firstname: firstname,
                lastname: lastname,
                promo: promo,
                color: color,
                adress: adress,
                phone: phone,
                email: email,
            });
            if(datas.status === 200){
                console.log("trainee créé")
            }
        } 
        postDatas();  
    }


    return (

        <Modal
        isOpen={seeUpdateModal}
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
                            {/* <select name="promo" id="promo_user" onChange={changePromo}>
                            {allPromo && allPromo.map((item,index)=> (
                                <option key={index} className="studends-list" value={item}>{item.promo}</option>
                            ))}
                            </select> */}
                            <input type="text" name="promo" value={promo} onChange={changePromo} />
                        </div>
                        <div className="user-form-right-content">
                            <label htmlFor="color">Couleur : 
                            <input type="text" name="color" value={color} onChange={changeColor} />
                            </label>
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
                        <button>valider</button>
                    </div>
                </form>
            
            </div>
        </Modal>
    )
}
