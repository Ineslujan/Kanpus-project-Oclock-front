import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { DateTime } from "luxon";
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';

import { deleteCourse } from '../../requests/myCourseRequests';
import { getEventsOrganizer } from '../../requests/aboutOrganizer';

import ArrowNext from '../../assets/images/arrow-next.png';
import Trash from '../../assets/images/trash.png';
import Pen from '../../assets/images/pen.png'

import './eventModal.scss';

export default function EventModal({ modalIsOpen, openModal, datas, checkWeekend, setEvents, settings, setPureEvents, firstDayOfWeek }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    Modal.setAppElement(document.getElementById('root'));

    const [traineeAbsence, setTraineeAbsence] = useState([]);
    const [arrow1, setArrow1] = useState(false);
    const [arrow2, setArrow2] = useState(false);
    const [arrow3, setArrow3] = useState(false);
    const [myData, setMyData] = useState(datas);

    const [seeConfirmationModal, setSeeConfirmationModal] = useState(false);

    useEffect(() => {
        setMyData(datas);
        // console.log("set")
    }, [datas])


    const addAbsenceTrainee = (e, item) => {
        if (traineeAbsence.includes(item)) {
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

    const seeContent = (value) => {
        value(arrow => !arrow)
    }

    const confirmationModal = () => {
        setSeeConfirmationModal(modal => !modal)
    }

    const deleteMyCourse = async (id) => {
        await deleteCourse(id, authentication.token);
        const getDatas = async () => {
            const datas = await getEventsOrganizer(firstDayOfWeek.toFormat("yyyy-MM-dd"), authentication.token);
            console.log("iciii la !!!", firstDayOfWeek.toFormat("yyyy-MM-dd"),datas.data);
            if (datas.status === 200) {
                console.log("iciii ???");
                setPureEvents(datas.data)
                const datasEvents = checkWeekend(datas.data, firstDayOfWeek, settings)
                setEvents(datasEvents)
                console.log(datas.data, firstDayOfWeek, settings)
            }
        }
        getDatas();
        setSeeConfirmationModal(modal => !modal)
        openModal()
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            className='Modal'
            overlayClassName='Overlay'
        >
            <div className="modal-course-info">

                <div className="modal-button-close">
                    <button className="close" onClick={openModal}><img src={svgCircle} alt="close-icon" /></button>
                </div>

                <div className="course-info">
                    {/* {console.log(datas)}  */}
                    <div className="modal-event-head">
                        <p className="modal-event-name">{datas.name}</p>
                        <p className="modal-event-place">{datas.place_name}</p>

                    </div>
                    <div className="modal-event-time">
                        <div className="modal-date-time-block">
                            <p className="modal-date-time-block-date">{DateTime.fromISO(datas.start_date).weekdayLong} {DateTime.fromISO(datas.start_date).day} {DateTime.fromISO(datas.start_date).monthLong}</p>
                            <p className="modal-date-time-block-hour">{DateTime.fromISO(datas.start_date).setLocale("fr").toUTC().toFormat("HH:mm")}</p>
                        </div>
                        <div className="modal-date-time-block">
                            <p className="modal-date-time-block-date">{DateTime.fromISO(datas.end_date).weekdayLong} {DateTime.fromISO(datas.end_date).day} {DateTime.fromISO(datas.end_date).monthLong}</p>
                            <p className="modal-date-time-block-hour">{DateTime.fromISO(datas.end_date).setLocale("fr").toUTC().toFormat("HH:mm")}</p>
                        </div>
                    </div>
                    {datas.address &&
                            <>
                                <p className="modal-adress-title">Adress</p>
                                <p className="modal-adress-content">Adress</p>
                            </>
                        }
                    <div className="modal-event-user-wrapper">
                        <div className="modal-event-user">
                            <h2 className="modal-event-user-title">Formateur</h2>
                            <div className="modal-event-user-name-wrapper">
                                {datas.former.map((item) => (
                                    <p className="modal-event-user-name" key={item.id}>{item.firstname} {item.lastname}</p>
                                ))}
                            </div>
                        </div>
                        {datas.trainee.length > 0 &&
                            <div className="modal-event-user">
                                <h2 className="modal-event-user-title">Stagiere</h2>
                                <div className="modal-event-user-name-wrapper">
                                    {datas.trainee.map((item) => (
                                        <button className="modal-event-user-name" key={item.id} onClick={(e) => addAbsenceTrainee(e, item.id)}> {item.firstname} {item.lastname} </button>
                                    ))}
                                </div>
                            </div>
                        }
                        
                        
                    </div>
                    <div className="modal-event-user-wrapper">
             


                    {datas.role &&
                        <div className="modal-text-event">
                            <div className="modal-text-title-container">
                                <p className="modal-event-user-title">Roles</p>
                                <button className="modal-arrow"><img src={ArrowNext} alt="arrow next" className={arrow1 ? "down" : ""} onClick={() => seeContent(setArrow1)} /></button>
                            </div>
                            {arrow1 &&
                                <div className="event-modal-textarea">
                                    <p className="modal-text-content">{datas.role}</p>
                                </div>
                            }
                        </div>
                    }

                    {datas.equipment &&
                        <div className="modal-text-event">
                            <div className="modal-text-title-container">
                                <p className="modal-event-user-title">Matériel</p>
                                <button className="modal-arrow"><img src={ArrowNext} alt="arrow next" className={!arrow2 ? "down" : ""} onClick={() => seeContent(setArrow2)} /></button>
                            </div>
                            {arrow2 &&
                                <div className="event-modal-textarea">
                                    <p className="modal-text-content">{datas.equipment}</p>
                                </div>
                            }
                        </div>
                    }

                    {datas.note &&
                        <div className="modal-text-event">
                            <div className="modal-text-title-container">
                                <p className="modal-event-user-title">Infos pratique</p>
                                <button className="modal-arrow"><img src={ArrowNext} alt="arrow next" className={arrow3 ? "down" : ""} onClick={() => seeContent(setArrow3)} /></button>
                            </div>
                            {arrow3 &&
                                <div className="event-modal-textarea">
                                    <p className="modal-text-content">{datas.note}</p>
                                </div>
                            }
                        </div>
                    }
                </div>
                </div>
                <div className="event-modal-icones">

                    <Link to="/add" state={{ myData }}>
                        <button className="event-modal-icone"><img src={Pen} alt="pen" /></button>
                    </Link>
                    <button className="event-modal-icone" onClick={confirmationModal}><img src={Trash} alt="trash" /></button>

                    <Modal
                        isOpen={seeConfirmationModal}
                        className='Modal'
                        overlayClassName='Overlay'

                    >
                        <div className="modal-button-close">
                            <div className="modal-confirmation-delete">
                                <button className="close" onClick={confirmationModal}><img src={svgCircle} alt="close-icon" /></button>
                            </div>
                        </div>
                        <div className="modal-confirmation-delete-button">
                            <div className="modal-confirmation-title">
                                <p>Voulez-vous vraiment supprimer ce cours ?</p>
                            </div>
                            <div className="modal-confirmation-delete-response">
                                <button className="modal-confirmation-response" onClick={confirmationModal}>Non</button>
                                <button className="modal-confirmation-response" onClick={() => deleteMyCourse(datas.event_id)}>Oui</button>
                            </div>
                        </div>
                    </Modal>

                </div>

            </div>

        </Modal>

    )
}
