import React, {useState} from 'react';
import { DateTime } from "luxon";

import './organizer.scss'

export default function Organizer() {

    const [today, setToday]=useState(new Date());

    const [firstDayOfWeek, setFirstDayOfWeek] = useState(DateTime.fromJSDate(today).minus({ days: DateTime.fromJSDate(today).weekday -1 }));

    const removeSevenDays = () => {
        setFirstDayOfWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({days: 7}))
    }

    const addSevenDays = () => {
        setFirstDayOfWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({days: 7}))
    }

  return (
    <div className="organizer-container">

        <div className="classroom-container">
            <div className="classroom">Salle de cours</div>
            <div className="classroom">Studio</div>
            <div className="classroom">Salle info 1</div>
            <div className="classroom">Salle info 2</div>
            <div className="classroom">Box 1</div>
            <div className="classroom">Box 2</div>
            <div className="classroom">Box 3</div>
        </div>
        <div className="weeks-container">
            <div className="days-container">
                <div className="days"> {firstDayOfWeek.weekdayLong} {firstDayOfWeek.day} {firstDayOfWeek.monthLong}</div>
                <div className="days"> {firstDayOfWeek.plus({days: 1}).weekdayLong} {firstDayOfWeek.plus({days: 1}).day} {firstDayOfWeek.plus({days: 1}).monthLong}</div>
                <div className="days"> {firstDayOfWeek.plus({days: 2}).weekdayLong} {firstDayOfWeek.plus({days: 2}).day} {firstDayOfWeek.plus({days: 2}).monthLong}</div>
                <div className="days"> {firstDayOfWeek.plus({days: 3}).weekdayLong} {firstDayOfWeek.plus({days: 3}).day} {firstDayOfWeek.plus({days: 3}).monthLong}</div>
                <div className="days"> {firstDayOfWeek.plus({days: 4}).weekdayLong} {firstDayOfWeek.plus({days: 4}).day} {firstDayOfWeek.plus({days: 4}).monthLong}</div>  
            </div>
        </div>
        <div className="weeks-button">
            <button className="weeks-button-left" onClick={removeSevenDays}> ! </button>
            <button className="weeks-button-right" onClick={addSevenDays}> ! </button>
        </div>
        <div className="year">{firstDayOfWeek.year}</div>
        
    </div>
  )
}
