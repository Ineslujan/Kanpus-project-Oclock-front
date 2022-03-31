import React, {useState} from 'react';
import { DateTime } from "luxon";

import './organizer.scss'

export default function Organizer() {

    const [today, setToday]=useState(new Date());

    const [firstDayOfWeek, setFirstDayOfWeek] = useState(DateTime.fromJSDate(today).minus({ days: DateTime.fromJSDate(today).weekday -1}));

    const removeSevenDays = () => {
        setFirstDayOfWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({days: 7}))
    }

    const addSevenDays = () => {
        setFirstDayOfWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({days: 7}))
    }

  return (
    <div className="weeks-container">
        <button className="weeks-container-button" onClick={removeSevenDays}> ! </button>
        <div className="days-container">
            <div className="days"> {firstDayOfWeek.weekdayLong} {firstDayOfWeek.day} {firstDayOfWeek.monthLong}</div>
            <div className="days"> {firstDayOfWeek.plus({days: 1}).weekdayLong} {firstDayOfWeek.plus({days: 1}).day} {firstDayOfWeek.plus({days: 1}).monthLong}</div>
            <div className="days"> {firstDayOfWeek.plus({days: 2}).weekdayLong} {firstDayOfWeek.plus({days: 2}).day} {firstDayOfWeek.plus({days: 2}).monthLong}</div>
            <div className="days"> {firstDayOfWeek.plus({days: 3}).weekdayLong} {firstDayOfWeek.plus({days: 3}).day} {firstDayOfWeek.plus({days: 3}).monthLong}</div>
            <div className="days"> {firstDayOfWeek.plus({days: 4}).weekdayLong} {firstDayOfWeek.plus({days: 4}).day} {firstDayOfWeek.plus({days: 4}).monthLong}</div>  
        </div>
        <button className="weeks-container-button" onClick={addSevenDays}> ! </button>
    </div>
  )
}
