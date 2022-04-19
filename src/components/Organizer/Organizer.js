
import React, { useState, useEffect, useContext } from 'react';
import { DateTime } from "luxon";

import { getPlacesOrganizer, getEventsOrganizer, getSettings } from '../../requests/aboutOrganizer';
import { defineCardWidth, calculateXPos } from './cards/cardPlacement';
import { handleWeekend } from './cards/handleWeekend';
import useWindowDimensions from '../../customHooks/getWindowDimensions';
import GridLayout from "react-grid-layout";
import { v4 as uuid } from 'uuid';
import EventModal from '../../components/EventModal/EventModal'
import { AuthenticationContext } from '../../context/authenticationContext';

import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import leftArrow from '../../assets/images/icones-bags-svg/bi-arrow-left-square-fill.svg';
import rightArrow from '../../assets/images/icones-bags-svg/bi-arrow-right-square-fill.svg';
import './organizer.scss'
import './cards.scss'


export default function Organizer() {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const windowWidth = useWindowDimensions().width;
    console.log(windowWidth);
    const windowWidthDividedEleven = useWindowDimensions().width / 11;

    const [today, setToday] = useState(new Date());
    const [firstDayOfWeek, setFirstDayOfWeek] = useState(DateTime.fromJSDate(today).minus({ days: DateTime.fromJSDate(today).weekday - 1 }));
    const [nextWeek, setNextWeek] = useState(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }));
    const [previousWeek, setPreviousWeek] = useState(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }));
    const [places, setPlaces] = useState([]);
    const [pureEvents, setPureEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventModal, setEventModal] = useState({});
    const [settings, setSettings] = useState({});

    const openModal = (event_id) => {
        setModalIsOpen(!modalIsOpen);
        const eventFiltered = pureEvents.filter(e => e.event_id === event_id)
        setEventModal(eventFiltered[0])
    }

    const changeToPreviousWeek = () => {
        console.log("-----changement de semaine-----");
        setFirstDayOfWeek(firstDayOfWeek => DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }));
    };

    const changeToNextWeek = () => {
        console.log("-----changement de semaine-----");
        setFirstDayOfWeek(firstDayOfWeek => DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }));
    };

    const UTCDate = (date, format) => {
        return DateTime.fromISO(date).setLocale("fr").toUTC().toFormat(format);
    }

    useEffect(() => {
        const getDatasSettings = async () => {
            const datas = await getSettings(authentication.token);
            console.log("rerender settings", datas);
            setSettings(datas);
        }
        getDatasSettings();
    }, [])


    useEffect(() => {
        setNextWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }))
        setPreviousWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }))

        const getEvents = async (date) => {
            const datas = await getEventsOrganizer(date.toFormat("yyyy-MM-dd"), authentication.token);
            setPureEvents(datas)
            return datas;
        };

        const prepareDataEvents = async () => {
            const dataEvents = await getEvents(firstDayOfWeek).catch();
            const dataReal = Object.keys(settings).length > 0 && handleWeekend(dataEvents, firstDayOfWeek, settings, firstDayOfWeek)
            setEvents(dataReal);

        }
        prepareDataEvents()

    }, [firstDayOfWeek, settings])

    useEffect(() => {
        const getDatas = async () => {
            const datas = await getPlacesOrganizer(authentication.token);
            setPlaces(datas);
        }
        getDatas();
    }, [])

    /**
     * TESTS pour Drag actions
     */
    const onDragStopTest = () => {
    }
    const onResizeStopTest = () => {
    }

    return (
        <>
            <GridLayout className={"layout"} cols={11} onDragStop={onDragStopTest} onResizeStop={onResizeStopTest} rowHeight={60} compactType={null} preventCollision={true} rows={8} width={windowWidth - windowWidth * 0.0104} maxRows={places.length + 1} >

                <div data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }} data-organizer-type="blank" key={uuid()} >
                    <div className="blank-row">
                        <div className="month-year">
                            <div className="month">{firstDayOfWeek.monthLong}</div>
                            <div className="year">{firstDayOfWeek.year}</div>
                        </div>
                        <div className="changeWeek">
                            <button className="weeks-button-left" onClick={changeToPreviousWeek}><img src={leftArrow} alt="left arrow" /></button>
                            <button className="weeks-button-right" onClick={changeToNextWeek}><img src={rightArrow} alt="right arrow" /></button>
                        </div>
                    </div>
                    <div className="row" style={{ width: (((windowWidth - windowWidth * 0.0104) / 11) * 11) + "px" }}></div>
                </div>

                <div data-grid={{ x: 1, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}>
                    <span className="column-weekday">{firstDayOfWeek.plus({ days: 0 }).weekdayLong}</span>
                    <span className="column-day">{firstDayOfWeek.plus({ days: 0 }).day}</span>
                    <div className="column" style={{ height: (70 * (places.length + 1)) + "px" }}></div> {/** For drawing externals borders in CSS */}
                    <div className="column-middle" style={{ height: (70 * (places.length)) + "px" }}></div> {/** For drawing middle borders in CSS */}
                </div>
                <div data-grid={{ x: 3, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}>
                    <span className="column-weekday">{firstDayOfWeek.plus({ days: 1 }).weekdayLong}</span>
                    <span className="column-day">{firstDayOfWeek.plus({ days: 1 }).day}</span>
                    <div className="column" style={{ height: (70 * (places.length + 1)) + "px" }}></div>
                    <div className="column-middle" style={{ height: (70 * (places.length)) + "px" }}></div>
                </div>
                <div data-grid={{ x: 5, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}>
                    <span className="column-weekday">{firstDayOfWeek.plus({ days: 2 }).weekdayLong}</span>
                    <span className="column-day">{firstDayOfWeek.plus({ days: 2 }).day}</span>
                    <div className="column" style={{ height: (70 * (places.length + 1)) + "px" }}></div>
                    <div className="column-middle" style={{ height: (70 * (places.length)) + "px" }}></div>
                </div>
                <div data-grid={{ x: 7, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}>
                    <span className="column-weekday">{firstDayOfWeek.plus({ days: 3 }).weekdayLong}</span>
                    <span className="column-day">{firstDayOfWeek.plus({ days: 3 }).day}</span>
                    <div className="column" style={{ height: (70 * (places.length + 1)) + "px" }}></div>
                    <div className="column-middle" style={{ height: (70 * (places.length)) + "px" }}></div>
                </div>
                <div data-grid={{ x: 9, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}>
                    <span className="column-weekday">{firstDayOfWeek.plus({ days: 4 }).weekdayLong}</span>
                    <span className="column-day">{firstDayOfWeek.plus({ days: 4 }).day}</span>
                    <div className="column" style={{ height: (70 * (places.length + 1)) + "px" }}></div>
                    <div className="column-middle" style={{ height: (70 * (places.length)) + "px" }}></div>
                </div>


                {
                    places.map((item) => {
                        return (
                            <div data-grid={{ x: 0, y: (item.position + 1), w: 1, h: 1, static: true }} data-organizer-type="row" key={uuid()}>
                                {item.name}
                                {console.log(windowWidth)}
                                <div className="row" style={{ width: (((windowWidth - windowWidth * 0.0104) / 11) * 11) + "px" }}></div>
                            </div>
                        )
                    })
                }

                {
                    Object.keys(settings).length > 0 && places.length > 0 && events.length > 0 && events.map((event) => {

                        const startDayNumber = Number(UTCDate(event.start_date, "E"));
                        const startDayHour = UTCDate(event.start_date, "HH:mm");
                        const endDayHour = UTCDate(event.end_date, "HH:mm");
                        const startDayHourSec = UTCDate(event.start_date, "TT");
                        const endDayHourSec = UTCDate(event.end_date, "TT");
                        const formatedStartDate = UTCDate(event.start_date, "yyyy-MM-dd");
                        const formatedEndDate = UTCDate(event.end_date, "yyyy-MM-dd");
                        const courseStartHourAm = DateTime.fromFormat(settings.course_start_hour_am, "TT").toFormat("T") + ":01"
                        const courseEndHourPm = DateTime.fromFormat(settings.course_end_hour_pm, "TT").toFormat("T") + ":01"

                        const verticalEventPos = Number(places[event.place_position].position + 1);

                        const x = calculateXPos(startDayNumber, startDayHour, settings);
                        const w = defineCardWidth(formatedStartDate, startDayHour, formatedEndDate, endDayHour, settings);

                        return (

                            <div data-grid={{
                                x,
                                y: verticalEventPos,
                                w,
                                h: 1,
                                maxH: 1,
                                static: true
                            }}
                                data-organizer-type="card"
                                style={{ backgroundColor: event.former[0].color }}
                                key={uuid()}
                                onClick={() => openModal(event.event_id)}
                            >
                                <div className="card-content">
                                    {event.name}
                                    <div className="card-content-time">
                                        <span>{startDayHourSec === courseStartHourAm ? `<< ${startDayHour}` : startDayHour}</span>
                                        <span>{endDayHourSec === courseEndHourPm ? `${endDayHour} >>` : endDayHour}</span>
                                    </div>
                                </div>
                            </div>

                        )
                    })

                }

            </GridLayout>
            {modalIsOpen &&
                <EventModal modalIsOpen={modalIsOpen} openModal={openModal} datas={eventModal} checkWeekend={handleWeekend} setPureEvents={setPureEvents} firstDayOfWeek={firstDayOfWeek} />}

        </>
    )
}
