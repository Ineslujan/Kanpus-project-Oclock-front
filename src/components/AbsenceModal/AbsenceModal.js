import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import { DateTime } from "luxon";
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
import { getAbsences } from '../../requests/absenceRequest';
import { v4 as uuid } from 'uuid';

export default function AbsenceModal({ absenceModal, seeAbsenceModal, setSeeAbsenceModal, item }) {

    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    const [allAbsences, setAllAbsences] = useState()

    useEffect(() => {
        const setAbsences = async () => {
            const absences = await getAbsences(item.id, authentication.token);
            if(absences.status === 200){
                setAllAbsences(absences.data);
            }
        }
        setAbsences()
    }, [])
    



    return (
            <Modal
                isOpen={seeAbsenceModal}
                className='Modal'
                overlayClassName='Overlay'
            >
                <div className="modal-button-close">

                    <button className="close" onClick={absenceModal}><img src={svgCircle} alt="close-icon" /></button>

                </div>
                <div className="modal-absence">
                    {allAbsences && allAbsences.length > 0 ? 
                        <div className="modal-absence-content">
                            {allAbsences.map((item) => (
                                <p key={uuid()}>{DateTime.fromISO(item.start_date).weekdayLong} {DateTime.fromISO(item.start_date).day} {DateTime.fromISO(item.start_date).monthLong} {DateTime.fromISO(item.start_date).year}  : {item.event_name} </p>
                    ))}
                </div> 
                :
                    "Aucune absence" 
                }
                </div>

            

            </Modal>
    )
}
