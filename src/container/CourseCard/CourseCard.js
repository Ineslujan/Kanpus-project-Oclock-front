import React, {useState} from 'react';
import { DateTime } from "luxon";
import MycourseModal from '../../components/MyCourseModal/MyCourseModal';
import useWindowDimensions from '../../customHooks/getWindowDimensions';

import './courseCard.scss'

export default function CourseCard({ datas, setAllCourses }) {
    
    const windowWidth = useWindowDimensions().width;

    const startDate = DateTime.fromJSDate(new Date(datas.start_date)).setLocale('fr');
    const endDate = DateTime.fromJSDate(new Date(datas.end_date)).setLocale('fr');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(!modalIsOpen);
        console.log("modalOpen");
        console.log(endDate);
    }

    return (
        <div className="mycourse-card">
            <div className="mycourse-card-day">
            {startDate.weekdayLong} {startDate.day} {startDate.monthLong} {startDate.year} 
            {/* {console.log("date=>", startDate )} */}
            </div>
            
            <div className="mycourse-card-course" onClick={openModal}>
                <div className="mycourse-card-name">
                    <p className="name">{datas.name}</p>
                    <p className="place">{datas.place_name}</p>
                </div>
                <div className="mycourse-card-former">
                   
                    <p className="former">{datas.former[0].firstname} {datas.former[0].lastname}</p>
                </div>
                <div className="duration">
                    {/* <span className="duration-course start">début</span><span className="duration-course end">fin</span> */}

                    <div className="mycourse-card-date">
                        <div className="start-date-container">
                            <label for="Start">Début</label>
                            <p className="date" id="Start">
                                {startDate.weekdayLong !== endDate.weekdayLong && `${windowWidth > 500 ? startDate.weekdayLong : startDate.weekdayShort}  ${startDate.day} à `}  
                                {startDate.setLocale("fr").toUTC().hour < 10 ? "0": ""}{startDate.setLocale("fr").toUTC().hour}:
                                {startDate.minute}{startDate.minute=== 0 ? "0":""} 
                            </p>
                        </div>
                        <div className="end-date-container">
                            <label for="End">Fin</label>
                            <p className="date" id="End">
                                {startDate.weekdayLong !== endDate.weekdayLong && `${windowWidth > 500 ? endDate.weekdayLong : endDate.weekdayShort }  ${endDate.day} à `}  
                                {endDate.setLocale("fr").toUTC().hour < 10 ? "0": ""}{endDate.setLocale("fr").toUTC().hour}:
                                {endDate.minute}{endDate.minute === 0 ? "0":""}
                            </p>
                        </div>
                    </div>
                </div>
        
            </div>
            {modalIsOpen &&
                <MycourseModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} openModal={openModal} datas={datas} setAllCourses={setAllCourses} />
            }
           
        </div>
    )
}
