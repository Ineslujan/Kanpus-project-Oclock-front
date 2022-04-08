
import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";
import { getPlacesOrganizer, getEventsOrganizer } from '../../requests/aboutOrganizer';
import { ajustX, defineCardWidth } from './cards/cardPlacement';
import useWindowDimensions from '../../customHooks/getWindowDimensions';
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

    const UTCDate = (date, format) => {
        return DateTime.fromISO(date).setLocale("fr").toUTC().toFormat(format);
    }

    const getEvents = async (date) => {
        const datas = await getEventsOrganizer(date.toFormat("yyyy-MM-dd"));
        setEvents(datas);
    };

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

        <GridLayout className="layout" cols={11} onDragStop={onDragStopTest} onResizeStop={onResizeStopTest} rowHeight={60} compactType={null} preventCollision={true} rows={8} width={windowWidth} maxRows={lengthPlaces && lengthPlaces + 1} >

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

            <div data-grid={{ x: 1, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 1"> {firstDayOfWeek.plus({ days: 0 }).weekdayLong} {firstDayOfWeek.plus({ days: 0 }).day} {firstDayOfWeek.plus({ days: 0 }).monthLong}
                <div className="column"></div> {/** For drawing externals borders in CSS */}
                <div className="column-middle"></div> {/** For drawing middle borders in CSS */}
            </div>
            <div data-grid={{ x: 3, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 2"> {firstDayOfWeek.plus({ days: 1 }).weekdayLong} {firstDayOfWeek.plus({ days: 1 }).day} {firstDayOfWeek.plus({ days: 1 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 5, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 3"> {firstDayOfWeek.plus({ days: 2 }).weekdayLong} {firstDayOfWeek.plus({ days: 2 }).day} {firstDayOfWeek.plus({ days: 2 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 7, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 4"> {firstDayOfWeek.plus({ days: 3 }).weekdayLong} {firstDayOfWeek.plus({ days: 3 }).day} {firstDayOfWeek.plus({ days: 3 }).monthLong}
                <div className="column"></div>
                <div className="column-middle"></div>
            </div>
            <div data-grid={{ x: 9, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key="day 5"> {firstDayOfWeek.plus({ days: 4 }).weekdayLong} {firstDayOfWeek.plus({ days: 4 }).day} {firstDayOfWeek.plus({ days: 4 }).monthLong}
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

            {
                events.length > 0 && events.map((event) => (
                    <div data-grid={{
                        x: Number(UTCDate(event.start_date, "E")) === 1 ? (1 + ajustX(UTCDate(event.start_date, "HH:mm")))
                            : Number(UTCDate(event.start_date, "E")) === 2 ? (3 + ajustX(UTCDate(event.start_date, "HH:mm")))
                                : Number(UTCDate(event.start_date, "E")) === 3 ? (5 + ajustX(UTCDate(event.start_date, "HH:mm")))
                                    : Number(UTCDate(event.start_date, "E")) === 4 ? (7 + ajustX(UTCDate(event.start_date, "HH:mm")))
                                        : Number(UTCDate(event.start_date, "E")) === 5 ? (9 + ajustX(UTCDate(event.start_date, "HH:mm")))
                                            : 1,
                        y: Number((places[Number(event.place_position)].position) + 1),
                        // 
                        w: defineCardWidth(UTCDate(event.start_date, "yyyy-MM-dd"), UTCDate(event.start_date, "HH:mm"), UTCDate(event.end_date, "yyyy-MM-dd"), UTCDate(event.end_date, "HH:mm")),
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

        </GridLayout>
    )
}
