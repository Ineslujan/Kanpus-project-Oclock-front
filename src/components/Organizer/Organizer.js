import React, { useState } from 'react';
import { DateTime } from "luxon";
import GridLayout from 'react-grid-layout';
import useWindowDimensions from '../../customHooks/getWindowDimensions';


import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import './organizer.scss'



export default function Organizer() {
    const windowWidth = useWindowDimensions().width;

    const [today, setToday] = useState(new Date());

    const [firstDayOfWeek, setFirstDayOfWeek] = useState(DateTime.fromJSDate(today).minus({ days: DateTime.fromJSDate(today).weekday - 1 }));

    const removeSevenDays = () => {
        setFirstDayOfWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }))
    }

    const addSevenDays = () => {
        setFirstDayOfWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }))
    }

    return (

        <GridLayout className="layout" cols={11} rowHeight={30} rows={8} compactType={false} width={windowWidth}>

            <div data-grid={{ x: 1, y: 0, w: 2, h: 1, static: true }} data-organizer-titles="column" key="day 1"> {firstDayOfWeek.weekdayLong} {firstDayOfWeek.day} {firstDayOfWeek.monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 3, y: 0, w: 2, h: 1, static: true }} data-organizer-titles="column" key="day 2"> {firstDayOfWeek.plus({ days: 1 }).weekdayLong} {firstDayOfWeek.plus({ days: 1 }).day} {firstDayOfWeek.plus({ days: 1 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 5, y: 0, w: 2, h: 1, static: true }} data-organizer-titles="column" key="day 3"> {firstDayOfWeek.plus({ days: 2 }).weekdayLong} {firstDayOfWeek.plus({ days: 2 }).day} {firstDayOfWeek.plus({ days: 2 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 7, y: 0, w: 2, h: 1, static: true }} data-organizer-titles="column" key="day 4"> {firstDayOfWeek.plus({ days: 3 }).weekdayLong} {firstDayOfWeek.plus({ days: 3 }).day} {firstDayOfWeek.plus({ days: 3 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 9, y: 0, w: 2, h: 1, static: true }} data-organizer-titles="column" key="day 5"> {firstDayOfWeek.plus({ days: 4 }).weekdayLong} {firstDayOfWeek.plus({ days: 4 }).day} {firstDayOfWeek.plus({ days: 4 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>

            <div data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }} key="blank" >
                <div className="blank-row">
                    <div className="year">{firstDayOfWeek.year}</div>
                    <div>
                        <button className="weeks-button-left" onClick={removeSevenDays}>&lt;</button>
                        <button className="weeks-button-right" onClick={addSevenDays}>&gt;</button>
                    </div>
                </div>
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 1, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 1" >Salle de cours
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 2, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 2" >Studio
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 3, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 3" >Salle info 1
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 4, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 4" >Salle info 2
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 5, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 5" >Box 1
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 6, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 6" >Box 2
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 7, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 7" >Box 3
                <div className="row"></div>
            </div>
            <div data-grid={{ x: 0, y: 8, w: 1, h: 1, static: true }} data-organizer-titles="row" key="salle 8" >Extérieur
                <div className="row"></div>
            </div>

            {/** Exemple de carte drag & drop */}
            <div data-grid={{ x: 3, y: 8, w: 1, h: 1 }} key="GG" >GGGGG</div>

        </GridLayout>
    )
}
