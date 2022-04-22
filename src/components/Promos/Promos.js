import React, {useState, useEffect, useContext} from 'react';
import { requestTrainee } from '../../requests/addClassesFormRequest';
import PromoCard from '../PromoCard/PromoCard';
import PromoCreate from '../PromoCreate/PromoCreate';
import { updatePromo, deletePromo } from '../../requests/promoRequest';

import addItem from '../../assets/images/icones-bags-svg/BiPlusCircle.svg'
import Pen from '../../assets/images/icones-bags-svg/bi-pen-fill.svg';

import './promos.scss';
import { AuthenticationContext } from '../../context/authenticationContext';
import { getAllPromo } from '../../requests/traineeRequest';


export default function Promos() {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [allPromo, setAllPromo] = useState(null);
    const [createModal, setCreateModal] = useState(false);

        const getDatas = async () => {
        // const trainees = await requestTrainee(authentication.token);
        // if(trainees.status === 200){
        //     setAllPromo(trainees.data)
        //     // setSelectedPromo(trainees.data[0])

        // }
        const allProm = await getAllPromo (authentication.token);
        if(allProm.status ===200){
            setAllPromo(allProm.data);
        }
 
    }

    // const getDatas = async () => {
    //     const datas = await getPlacesOrganizer(authentication.token);
    //         setAllPlaces(datas.data);
    //         console.log(allPlaces)
    // }
 
    useEffect(() => {
        getDatas();
        
    }, [])

    const toggleCreateModal = () => {
        setCreateModal(modal => !modal)
        console.log("allpromo",allPromo)
    }

 
    
    
    return (
        <div className="promo">
            <div className="promo-container">
                {createModal && <PromoCreate createModal={createModal} toggleCreateModal={toggleCreateModal} getDatas={getDatas} allPromo={allPromo} setAllPromo={setAllPromo} />}
                
                <div className="promo-create">
                    <p className="promos-title">Promos</p>
                    <button className="promo-create-button" onClick={toggleCreateModal} ><img className="add-item-icon" src={addItem} alt="addItem" /></button>
                </div>
                <div className="promo-content">
                    {allPromo &&  allPromo.map((item, index) => (
                            <PromoCard key={index} data={item} getDatas={getDatas} />
                    ))}
                </div>

            </div>
        </div>
  )
}

