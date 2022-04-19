import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import '../ClasseRoomAdd/classeRoomAdd.scss';
import { AuthenticationContext } from '../../context/authenticationContext';
import { addPromo } from '../../requests/promoRequest';

export default function PromoCreate({ createModal, toggleCreateModal, getDatas, allPromo }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    Modal.setAppElement(document.getElementById('root'));

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);


    // const changePosition = (e) => {
    //     setNewPosition(e.target.value);
    // }

    const changeName = (e) => {
        setName(e.target.value);
        console.log(e.target.value)
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        const postPlace = async () => {
            const datas = await addPromo({
              name: name
            }, authentication.token);
            if(datas.status === 200){
                toggleCreateModal();
                getDatas();
                console.log("promo", name );
            }
        }
        postPlace();
    }


    return (
        <Modal isOpen={createModal}> 
      
            <div className="modal-button-close">
                <button className="close" onClick={toggleCreateModal}>x</button>
            </div>
            <div className="classeroom-add-container">
                <form className="classeroom-add-form" onSubmit={onSubmit}>
                    <div className="classeroom-form">
                        <label htmlFor="classeroom-name" className="classeroom-form-label">Nom :</label>
                        <input type="text" className="classeroom-form-input" value={name} onChange={changeName} /> 
                        {nameError && <p className="classeroom-form-error">Ce nom est déjà attribué à une autre salle</p>}
                    </div>
                          <button>valider</button>
                </form>
            </div>
        </Modal>
    )
}






















































































// import React, { useState, useEffect, useContext } from 'react';
// import Modal from 'react-modal';
// import { addPromo } from '../../requests/promoRequest';
// import { AuthenticationContext } from '../../context/authenticationContext';

// export default function PromoCreate({ updateModal, setUpdateModal, setUpdate, getStudents, closeIdentityModal }) {
//     const { authentication, setAuthentication } = useContext(AuthenticationContext);

//     Modal.setAppElement(document.getElementById('root'));

//     const [promoName, setPromoName] = useState("");
//     const [startPromo, setStartPromo] = useState("");
//     const [endPromo, setEndPromo] = useState("");


//     const changePromoName = (e) => {
//         setPromoName(e.target.value);
//     }

//     const changeStartPromo = (e) => {
//         setStartPromo(e.target.value);
//     }

//     const changeEndPromo = (e) => {
//         setEndPromo(e.target.value);
//     }

//     const handlerSubmit = (e) => {
//         e.preventDefault();

//         const postPromos = async () => {
//             const datas = await addPromo({
//                name: promoName,
//                start_date: startPromo,
//                end_date: endPromo
//             }, authentication.token);
//             if(datas.status === 200){
//                 console.log("yououbhjhdjd")
//                 // getStudents();
//                 // setUpdate();
//             }
//         }
//         postPromos();
//     }

//     return (

//         <Modal
//         isOpen={updateModal}
//         >
//             <div className="user-form">
//                 <div className="modal-button-close">
//                     <button className="close" onClick={setUpdate}>x</button>
//                 </div>
//                 <form action="" onSubmit={handlerSubmit}>
//                     <div className="user-form-name-container">
//                         <input type="text" value={promoName} onChange={changePromoName} />
//                     </div>
//                     <div className="user-form-name-container">
//                         <input type="text" value={startPromo} onChange={changeStartPromo} />
//                     </div>
//                     <div className="user-form-name-container">
//                         <input type="text" value={endPromo} onChange={changeEndPromo} />
//                     </div>

//                         <button>valider</button>
                    
//                 </form>
            
//             </div>
//         </Modal>
//     )
// }

