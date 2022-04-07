import React, {useState} from 'react';
import Modal from 'react-modal';
import { DateTime } from "luxon";
import ArrowNext from '../../public/images/arrow-next.png';

import './myCourseModal.scss';

export default function MyCourseModal({ modalIsOpen, openModal, datas}) {

    Modal.setAppElement(document.getElementById('root'));

    const [traineeAbsence, setTraineeAbsence] = useState([]);
    const [arrow, setArrow]=useState(false)
    
    const addAbsenceTrainee = (e, item) => {
        if(traineeAbsence.includes(item)){
            setTraineeAbsence(traineeAbsence.filter(trainee => trainee !== item));
            e.target.style.color = "black";
        } else {
            setTraineeAbsence([
                ...traineeAbsence,
                item
            ])
            e.target.style.color = "red";
        }
    }

  return (
    <Modal
    isOpen={modalIsOpen}
    // onAfterOpen={afterOpenModal}
    // onRequestClose={closeModal}
    // style={customStyles}
    // contentLabel="Example Modal"
  >
        <div className="modal-course-info">
            <div className="modal-button-close">
                <button className="close" onClick={openModal}>x</button>
            </div>
            <div className="course-info">
                {console.log(datas)} 
                <div className="modal-name-date">
                    <p className="modal-name">{datas.name}</p>
                    <p className="modal-date modal-start">Début : {DateTime.fromISO(datas.start_date).weekdayLong} {DateTime.fromISO(datas.start_date).day} {DateTime.fromISO(datas.start_date).monthLong}  {DateTime.fromISO(datas.start_date).setLocale("fr").toUTC().toFormat("HH:mm")}</p>
                    <p className="modal-date modal-end">Fin : {DateTime.fromISO(datas.end_date).weekdayLong} {DateTime.fromISO(datas.end_date).day} {DateTime.fromISO(datas.end_date).monthLong}  {DateTime.fromISO(datas.end_date).setLocale("fr").toUTC().toFormat("HH:mm")}</p>
                </div>
                <div className="modal-adress-former">
                <p className="modal-place">{datas.place_name}</p>
                {datas.address &&
                <>
                    <p className="modal-adress-title">Adress</p>
                    <p className="modal-adress-content">Adress</p>
                </>
                }
                {datas.former.map((item) => (
                        <p className="modal-former" key={item.id}>{item.firstname} {item.lastname}</p>
                    ))}
                </div>
                {datas.trainee.length > 0 &&
                <div className="modal-trainee">
                    <p className="modal-trainee-title">{datas.trainee.length} Stagiaires</p>
                    <div className="modal-all-trainee">
                        {datas.trainee.map((item) => (
                            <button className="modal-trainee" key={item.id} onClick={(e)=>addAbsenceTrainee(e, item.id)}> {item.firstname} {item.lastname} </button>
                        ))}
                    </div>
                     {/* {prof &&  */}
                     <button className="modal-trainer-absence"> Valider les absences </button>
                        {/* } */}
                </div>
                }
                {datas.role &&
                    <div className="modal-text">
                        <div className="modal-text-title-container">
                            <p className="modal-text-title">Roles</p> 
                            <button className="modal-arrow"><img src={ArrowNext} alt="arrow next" className={arrow && "down"} /></button>
                        </div>
                        {arrow &&
                            <div className="modal-textarea">
                                <p className="modal-text-content">{datas.role}</p>
                            </div>
                        }
                    </div>
                }

                {datas.equipment &&
                    <div className="modal-text">
                        <div className="modal-text-title-container">
                            <p className="modal-text-title">Matériel</p> 
                            <button className="modal-arrow"><img src={ArrowNext} alt="arrow next" className={!arrow && "down"}/></button>
                        </div>
                        {arrow &&
                            <div className="modal-textarea">
                                <p className="modal-text-content">{datas.equipment}</p>
                            </div>
                        }
                    </div>
                }

                {datas.note &&
                    <div className="modal-text">
                        <div className="modal-text-title-container">
                            <p className="modal-text-title">Infos pratique</p> 
                            <button className="modal-arrow"><img src={ArrowNext} alt="arrow next" className={arrow && "down"} /></button>
                        </div>
                        <div className="modal-textarea">
                            <p className="modal-text-content">{datas.note}</p>
                        </div>
                    </div>
                }
      
            </div>
            
            
        </div>

        </Modal>

  )
}
