import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addPromo } from '../../requests/promoRequest';

export default function PromoCreate({ updateModal, setUpdateModal, setUpdate, getStudents, closeIdentityModal }) {

    Modal.setAppElement(document.getElementById('root'));

    const [promoName, setPromoName] = useState("");
    const [startPromo, setStartPromo] = useState("");
    const [endPromo, setEndPromo] = useState("");


    const changePromoName = (e) => {
        setPromoName(e.target.value);
    }

    const changeStartPromo = (e) => {
        setStartPromo(e.target.value);
    }

    const changeEndPromo = (e) => {
        setEndPromo(e.target.value);
    }

    const handlerSubmit = (e) => {
        e.preventDefault();

        const postPromos = async () => {
            const datas = await addPromo({
               name: promoName,
               start_date: startPromo,
               end_date: endPromo
            });
            if(datas.status === 200){
                console.log("yououbhjhdjd")
                // getStudents();
                // setUpdate();
            }
        }
        postPromos();
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
                        <input type="text" value={promoName} onChange={changePromoName} />
                    </div>
                    <div className="user-form-name-container">
                        <input type="text" value={startPromo} onChange={changeStartPromo} />
                    </div>
                    <div className="user-form-name-container">
                        <input type="text" value={endPromo} onChange={changeEndPromo} />
                    </div>

                        <button>valider</button>
                    
                </form>
            
            </div>
        </Modal>
    )
}

