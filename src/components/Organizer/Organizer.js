
import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";
import { getPlacesOrganizer, getEventsOrganizer } from '../../requests/aboutOrganizer';
import  useWindowDimensions from '../../customHooks/getWindowDimensions';
import GridLayout from "react-grid-layout";

import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import './organizer.scss'
import './cards.scss'



export default function Organizer() {
    const windowWidth = useWindowDimensions().width;
    const windowWidthDividedEleven = useWindowDimensions().width / 11;

    const [today, setToday] = useState(new Date());
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(DateTime.fromJSDate(today).minus({ days: DateTime.fromJSDate(today).weekday - 1 }));
    const [nextWeek, setNextWeek] = useState(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }));
    const [previousWeek, setPreviousWeek] = useState(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }));
    const [places, setPlaces] = useState();
    const [lengthPlaces, setLengthPlaces] = useState(undefined);
    const [events, setEvents] = useState([]);

    const removeSevenDays = () => {
        setFirstDayOfWeek(firstDayOfWeek => DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }));
        getEvents(previousWeek);
    };

    const addSevenDays = () => {
        setFirstDayOfWeek(firstDayOfWeek => DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }));
        getEvents(nextWeek);
    };

    const daysWeek = {
        Monday: {
            x: 1,
            day: firstDayOfWeek.plus({ days: 0 }),
        },
        Tuesday: {
            x: 3,
            day: firstDayOfWeek.plus({ days: 1 }),
        },
        Wednesday: {
            x: 5,
            day: firstDayOfWeek.plus({ days: 2 }),
        },
        Thursday: {
            x: 7,
            day: firstDayOfWeek.plus({ days: 3 }),
        },
        Friday: {
            x: 9,
            day: firstDayOfWeek.plus({ days: 4 }),
        },
    }

    const UTCDate = (date, format) => {
        return DateTime.fromISO(date).setLocale("fr").toUTC().toFormat(format);
    }

    // console.log(UTCDate(events[0].start_date, "E"));


    const getEvents = async (date) => {
        const datas = await getEventsOrganizer(date.toFormat("yyyy-MM-dd"));
        setEvents(datas);
    };

    // const eventsLocal = [{"event_id":1,"name":"COURS RÉALISATION TECHNIQUE DE TOURNAGE","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-09-27T06:45:00.000Z","end_date":"2021-09-27T14:45:00.000Z","place_id":7,"place_name":"Salle de cours","place_position":3,"duration":{"hours":8},"dotw_number":"1","former":[{"id":3,"firstname":"Remy","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":5,"firstname":"Anne","lastname":"Tataway","is_absent":false},{"id":6,"firstname":"Romane","lastname":"Beauroger","is_absent":false},{"id":7,"firstname":"Romain","lastname":"Beauroger","is_absent":false}]},{"event_id":2,"name":"PREPA MICROFICTION / VISIONNAGE / EXPLICATIONS","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-09-28T06:45:00.000Z","end_date":"2021-09-28T14:45:00.000Z","place_id":7,"place_name":"Salle de cours","place_position":3,"duration":{"hours":8},"dotw_number":"2","former":[{"id":1,"firstname":"Alain","lastname":"Deloin","color":"#269987"},{"id":3,"firstname":"Remy","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":5,"firstname":"Anne","lastname":"Tataway","is_absent":false},{"id":6,"firstname":"Romane","lastname":"Beauroger","is_absent":false},{"id":7,"firstname":"Romain","lastname":"Beauroger","is_absent":false}]},{"event_id":3,"name":"ATELIER FCPX","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-09-29T06:45:00.000Z","end_date":"2021-09-29T14:45:00.000Z","place_id":2,"place_name":"Salle info 1","place_position":1,"duration":{"hours":8},"dotw_number":"3","former":[{"id":1,"firstname":"Alain","lastname":"Deloin","color":"#269987"}],"trainee":[{"id":5,"firstname":"Anne","lastname":"Tataway","is_absent":false}]},{"event_id":4,"name":"ATELIER GH4","address":null,"note":null,"equipment":"GH4 ","role":null,"start_date":"2021-09-29T06:45:00.000Z","end_date":"2021-09-29T14:45:00.000Z","place_id":1,"place_name":"Studio","place_position":0,"duration":{"hours":8},"dotw_number":"3","former":[{"id":2,"firstname":"Francis","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":6,"firstname":"Romane","lastname":"Beauroger","is_absent":false}]},{"event_id":5,"name":"ATELIER ÉCRITURE","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-09-29T06:45:00.000Z","end_date":"2021-09-29T14:45:00.000Z","place_id":7,"place_name":"Salle de cours","place_position":3,"duration":{"hours":8},"dotw_number":"3","former":[{"id":3,"firstname":"Remy","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":7,"firstname":"Romain","lastname":"Beauroger","is_absent":false}]},{"event_id":6,"name":"ATELIER FCPX","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-09-30T06:45:00.000Z","end_date":"2021-09-30T14:45:00.000Z","place_id":2,"place_name":"Salle info 1","place_position":1,"duration":{"hours":8},"dotw_number":"4","former":[{"id":1,"firstname":"Alain","lastname":"Deloin","color":"#269987"}],"trainee":[{"id":7,"firstname":"Romain","lastname":"Beauroger","is_absent":false}]},{"event_id":7,"name":"ATELIER GH4","address":null,"note":null,"equipment":"GH4 ","role":null,"start_date":"2021-09-30T06:45:00.000Z","end_date":"2021-09-30T14:45:00.000Z","place_id":1,"place_name":"Studio","place_position":0,"duration":{"hours":8},"dotw_number":"4","former":[{"id":2,"firstname":"Francis","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":5,"firstname":"Anne","lastname":"Tataway","is_absent":false}]},{"event_id":8,"name":"ATELIER ÉCRITURE","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-09-30T06:45:00.000Z","end_date":"2021-09-30T14:45:00.000Z","place_id":7,"place_name":"Salle de cours","place_position":3,"duration":{"hours":8},"dotw_number":"4","former":[{"id":3,"firstname":"Remy","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":6,"firstname":"Romane","lastname":"Beauroger","is_absent":false}]},{"event_id":9,"name":"ATELIER FCPX","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-10-01T06:45:00.000Z","end_date":"2021-10-01T14:45:00.000Z","place_id":2,"place_name":"Salle info 1","place_position":1,"duration":{"hours":8},"dotw_number":"5","former":[{"id":1,"firstname":"Alain","lastname":"Deloin","color":"#269987"}],"trainee":[{"id":6,"firstname":"Romane","lastname":"Beauroger","is_absent":false}]},{"event_id":10,"name":"ATELIER GH4","address":null,"note":null,"equipment":"GH4 ","role":null,"start_date":"2021-10-01T06:45:00.000Z","end_date":"2021-10-01T14:45:00.000Z","place_id":1,"place_name":"Studio","place_position":0,"duration":{"hours":8},"dotw_number":"5","former":[{"id":2,"firstname":"Francis","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":7,"firstname":"Romain","lastname":"Beauroger","is_absent":false}]},{"event_id":11,"name":"ATELIER ÉCRITURE","address":null,"note":null,"equipment":null,"role":null,"start_date":"2021-10-01T06:45:00.000Z","end_date":"2021-10-01T14:45:00.000Z","place_id":7,"place_name":"Salle de cours","place_position":3,"duration":{"hours":8},"dotw_number":"5","former":[{"id":3,"firstname":"Remy","lastname":"Lalouche","color":"#269987"}],"trainee":[{"id":5,"firstname":"Anne","lastname":"Tataway","is_absent":false}]},{"event_id":12,"name":"Smartphone video","address":null,"note":null,"equipment":"iphone","role":null,"start_date":"2021-09-27T06:45:00.000Z","end_date":"2021-09-30T22:30:00.000Z","place_id":6,"place_name":"Box 3","place_position":6,"duration":{"days":3,"hours":15,"minutes":45},"dotw_number":"1","former":[],"trainee":[{"id":4,"firstname":"Jean","lastname":"Moulin","is_absent":false}]}]

    useEffect(() => {
        setNextWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }))
        setPreviousWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }))
    }, [firstDayOfWeek])

    useEffect(() => {
        const getDatas = async () => {
            const datas = await getPlacesOrganizer();
            setLengthPlaces(datas.length)
            setPlaces(datas);
        }
        getDatas();
    }, [])

    useEffect(() => {
        getEvents(firstDayOfWeek)
    }, [])

    /**
     * TESTS pour Drag actions
     */
    const onDragStopTest = () => {
        console.log("onDragStop");
    }
    const onResizeStopTest = () => {
        console.log("onResizeStop");
    }

    return (

        < GridLayout className="layout" cols={11} onDragStop={onDragStopTest} onResizeStop={onResizeStopTest} rowHeight={60} compactType={null} preventCollision={true} rows={8} width={windowWidth} maxRows={lengthPlaces && lengthPlaces + 1} >

            <div data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }} data-organizer-type="blank" key="blank" >
                <div className="blank-row">
                    <div className="year">{firstDayOfWeek.year}</div>
                    <div>
                        <button className="weeks-button-left" onClick={removeSevenDays}>&lt;</button>
                        <button className="weeks-button-right" onClick={addSevenDays}>&gt;</button>
                    </div>
                </div>
                <div className="row"></div>
            </div>

            <div data-grid={{ x: daysWeek.Monday.x, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 1"> {daysWeek.Monday.day.weekdayLong} {daysWeek.Monday.day.day} {daysWeek.Monday.day.monthLong}
                <div className="column"></div> {/** For drawing externals borders in CSS */}
                <div className="column-middle"></div> {/** For drawing middle borders in CSS */}
            </div>
            <div data-grid={{ x: daysWeek.Tuesday.x, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 2"> {daysWeek.Tuesday.day.weekdayLong} {daysWeek.Tuesday.day.day} {daysWeek.Tuesday.day.monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: daysWeek.Wednesday.x, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 3"> {daysWeek.Wednesday.day.weekdayLong} {daysWeek.Wednesday.day.day} {daysWeek.Wednesday.day.monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: daysWeek.Thursday.x, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 4"> {daysWeek.Thursday.day.weekdayLong} {daysWeek.Thursday.day.day} {daysWeek.Thursday.day.monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: daysWeek.Friday.x, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 5"> {daysWeek.Friday.day.weekdayLong} {daysWeek.Friday.day.day} {daysWeek.Friday.day.monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>


            {
                places && places.map((item) => (
                    <div data-grid={{ x: 0, y: (item.position + 1), w: 1, h: 1, static: true }} data-organizer-type="row" key={`${item.id + item.name}`}>
                        {item.name}
                        <div className="row"></div>
                    </div>
                ))
            }

{/* {events.length > 0 && console.log(Number(UTCDate("2022-04-11T08:45:00.000Z", "E")))}
{events.length > 0 && console.log(Number(UTCDate("2022-04-12T08:45:00.000Z", "E")))}
{events.length > 0 && console.log(Number(UTCDate("2022-04-13T08:45:00.000Z", "E")))}
{events.length > 0 && console.log(Number(UTCDate("2022-04-14T08:45:00.000Z", "E")))}
{events.length > 0 && console.log(Number(UTCDate("2022-04-15T08:45:00.000Z", "E")))} */}
            {
                events.length > 0 && events.map((event) => (
                    <div data-grid={{
                        x: Number(UTCDate(event.start_date, "E")) === 1 ? 1
                            : Number(UTCDate(event.start_date, "E")) === 2 ? 3
                                : Number(UTCDate(event.start_date, "E")) === 3 ? 5
                                    : Number(UTCDate(event.start_date, "E")) === 4 ? 7
                                        : Number(UTCDate(event.start_date, "E")) === 5 ? 9 : 1,
                        y: (Number(places[event.place_position].position + 1)),
                        w: 1,
                        h: 1,
                        maxH: 1
                    }}
                        data-organizer-type="card" style={{ backgroundColor: event.former[0].color }} key={`${event.event_id + event.name}`} >
                        <div className="card-content">
                            {event.name}
                            <div className="card-content-time">
                                <span>{UTCDate(event.start_date, "HH:mm")}</span>
                                <span>{UTCDate(event.end_date, "HH:mm")}</span>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* Drag&drop cards examples 
            <div data-grid={{ x: 3, y: 7, w: 1, h: 1, maxH: 1 }} key="GG" >GGGGG</div>
            <div data-grid={{ x: 3, y: 5, w: 1, h: 1, maxH: 1 }} key="GGvv" >SSssssS</div>
            */}
        </ GridLayout >
    )
}
