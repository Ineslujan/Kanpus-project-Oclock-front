import React from 'react';
import { DateTime } from "luxon";

import './courseCard.scss'

export default function CourseCard({ datas }) {

    const startDate = DateTime.fromJSDate(new Date(datas.start_date));
    const endDate = DateTime.fromJSDate(new Date(datas.end_date));

    return (
        <div className="mycourse-card">
            <div className="mycourse-card-day">
            {startDate.weekdayLong} {startDate.day} {startDate.monthLong} {startDate.year} 
            {/* {console.log("date=>", startDate)} */}
            </div>
            
            <div className="mycourse-card-course">
                <div className="mycourse-card-name">
                    <p className="name">{datas.name}</p>
                </div>
                <div className="mycourse-card-former">
                    <p className="former">{datas.place_name}</p>
                    <p className="former">{datas.former[0].firstname} {datas.former[0].lastname}</p>
                
                </div>
                <div className="duration">
                    <span className="duration-course start">début</span><span className="duration-course end">fin</span>
                </div>
                <div className="mycourse-card-date">
                    <p className="date">{startDate.weekdayLong !== endDate.weekdayLong && `${startDate.weekdayLong}  ${startDate.day} à`}  {startDate.hour}h{startDate.minutes}</p>
                    <p className="date">{startDate.weekdayLong !== endDate.weekdayLong && `${endDate.weekdayLong}  ${endDate.day} à`}  {endDate.hour}h{endDate.minutes}</p>
                  
                </div>
            </div>
        </div>
    )
}
