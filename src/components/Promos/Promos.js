import React, { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import { requestTrainee } from '../../requests/addClassesFormRequest';
import SelectedPromo from '../../container/SelectedPromo/SelectedPromo';
import IdentityCard from '../../container/IdentityCard/IdentityCard';
import PromoCreate from '../PromoCreate/PromoCreate';
import { updatePromo, deletePromo } from '../../requests/promoRequest';

import Pen from '../../assets/images/icones-bags-svg/bi-pen-fill.svg';

import './promos.scss';


export default function Promos() {
    const { authentication } = useContext(AuthenticationContext);

    const [allPromo, setAllPromo] = useState(null);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [student, setStudent] = useState(null);
    const [seeUpdateModal, setSeeUpdateModal] = useState(false);
    const [seeUpdateInput, setSeeUpdateInput] = useState(false);
    const [updateInput, setUpdateInput] = useState("")

    const getStudents = async () => {
        const trainees = await requestTrainee(authentication.token);
        if(trainees.status === 200){
            setAllPromo(trainees.data)
            setSelectedPromo(trainees.data[0])

        }
    }
    
    const setUpdate = () => {
        setSeeUpdateModal(seeUpdateModal => !seeUpdateModal);
        
    }

    const updateButton = () => {
        console.log('youhou');
        setSeeUpdateInput(true);
    }

    const changeUpdateInput = (e) => {
        setUpdateInput(e.target.value);
    }

    const deletePromo = async () => {
        // const promo = await deletePromo(selectedPromo.trainee[0].promo_id, authentication.token);
        if(promo.status === 200){
           console.log('ca marche on efface une promo promo');
           setSeeUpdateInput(false);
        }
    }

    const onSubmitPromo = (e) => {
        e.preventDefault()
        console.log(selectedPromo.trainee[0].promo_id);
        const update = async () => {
            const promo = await updatePromo(selectedPromo.trainee[0].promo_id, {
                name: updateInput,
            }, authentication.token);
            if(promo.status === 200){
               console.log('ca marche lupdate promo');
               setSeeUpdateInput(false);
            }
        }
        update();
    }
  
    return (
        <div className='trainee'> 
            <div className="promos">
                {!seeUpdateInput ?
                <>
                    <SelectedPromo selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} allPromo={allPromo} setAllPromo={setAllPromo} getStudents={getStudents} />
                    <button className="promo-icon-pen" onClick={updateButton}> <img src={Pen} alt="pen" /></button>
                </>
                :
                <>
                    <div className="promos-update">
                        <form className="promos-update-form" onSubmit={onSubmitPromo}>
                            <input type="text" className="promos-update-input" placeholder={selectedPromo.promo} value={updateInput} onChange={changeUpdateInput} /> <button>Valider</button>
                        </form>
                    </div>
                    <div className="promo-delete">
                        <button onClick={deletePromo}>Supprimez la promo {selectedPromo.promo}</button>
                    </div>
                </>

                }
            </div>

                <div className="trainee-create">
                    <button className="trainer-create-button" onClick={setUpdate}>Créer une Promo</button>
                    {seeUpdateModal && <PromoCreate updateModal={seeUpdateModal} setUpdateModal={setSeeUpdateModal}  setUpdate={setUpdate} allPromo={allPromo} getStudents={getStudents} /> }
                </div>

            <div className="trainee-container">
                <div className="trainee-content">
                   
                    <div className="trainee-content-promo">
                        <div className="trainee-content-promo-title">

                        </div>
                        <div className="trainee-content-promo-students">
                            {selectedPromo && selectedPromo.trainee.map((item)=> (
                                <IdentityCard key={item.id} item={item}  setStudent={setStudent} setSelectedPromo={setSelectedPromo} setAllPromo={setAllPromo} setSeeUpdateModal={setSeeUpdateModal} getStudents={getStudents}/>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

  )
    
}
