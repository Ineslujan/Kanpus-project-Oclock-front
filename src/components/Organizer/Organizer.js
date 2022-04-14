
import React, { useState, useEffect } from 'react';
import { DateTime, Interval } from "luxon";
import { getPlacesOrganizer, getEventsOrganizer } from '../../requests/aboutOrganizer';
import { ajustX, defineCardWidth } from './cards/cardPlacement';
import useWindowDimensions from '../../customHooks/getWindowDimensions';
import GridLayout from "react-grid-layout";
import { v4 as uuid } from 'uuid';
import MycourseModal from '../../components/MyCourseModal/MyCourseModal'


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
    const [places, setPlaces] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventModal, setEventModal] = useState({});

    const openModal = (event) => {
        setModalIsOpen(!modalIsOpen);
        setEventModal(event)
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



    const checkWeekend = (dataEvents, date) => {
        const dataReal = dataEvents.map(event => {
            return { ...event }
        });
        const firstWeekDay = date;
        const firstWeekDayWeekNumber = firstWeekDay.toFormat('WW');
        console.log("_____________ ", firstWeekDayWeekNumber);


        dataReal.forEach((d) => {
            const startDate = DateTime.fromISO(d.start_date)
            const endDate = DateTime.fromISO(d.end_date)
            const startWeekdayNumber = DateTime.fromISO(d.start_date).toFormat('c') // 3 (wednesday)
            const endWeekdayNumber = DateTime.fromISO(d.end_date).toFormat('c') // 6 (saturday)
            const startWeekNumber = DateTime.fromISO(d.start_date).toFormat('WW') // 23rd week
            const endWeekNumber = DateTime.fromISO(d.end_date).toFormat('WW') // 24rd week
            console.log("!!! WeekNumber !!!", startWeekNumber, endWeekNumber);

            const diffEvent = endDate.diff(startDate, 'weeks')
            const gapWeek = diffEvent.weeks

            const newStartDate = (StartEnd, weekdayNumber, date) => {
                const toRemoveInStartDate = Math.abs(Number(weekdayNumber) - 1);
                const newDate = date.minus({ days: toRemoveInStartDate }).toFormat("yyyy-MM-dd")
                d.start_date = `${newDate}T03:00:00.000Z`; //! link sur les heures de base
                return
            }

            const newEndDate = (StartEnd, weekdayNumber, date) => {
                const toAddInEndDate = Math.abs(Number(weekdayNumber) - 5);
                const newDate = date.plus({ days: toAddInEndDate }).toFormat("yyyy-MM-dd")
                d.end_date = `${newDate}T22:00:00.000Z`; //! link sur les heures de base
                return
            }

            if (gapWeek >= 1) {
                if (startWeekNumber === firstWeekDayWeekNumber && (startWeekdayNumber !== 6 || startWeekdayNumber !== 7)) { //! revoir les 6 et 7 si c'est pertinent
                    newEndDate("end", startWeekdayNumber, startDate)
                    console.log("start week => ", startWeekNumber, d);
                    console.log("start weekday number => ", startWeekdayNumber);
                }
                else if (endWeekNumber === firstWeekDayWeekNumber && (endWeekdayNumber !== 6 || endWeekdayNumber !== 7)) { //! revoir les 6 et 7 si c'est pertinent
                    newStartDate("start", endWeekdayNumber, endDate)
                    console.log("end week => ", endWeekNumber, d);
                    console.log("end weekday number => ", endWeekdayNumber);
                }
                else {
                    d.start_date = `${firstDayOfWeek.toFormat("yyyy-MM-dd")}T03:00:00.000Z`; //! link sur les heures de base
                    d.end_date = `${firstDayOfWeek.plus({ days: 4 }).toFormat("yyyy-MM-dd")}T22:00:00.000Z`; //! link sur les heures de base
                    console.log("between week => ", startWeekNumber, endWeekNumber, d);
                }

            }
            else if (startWeekdayNumber > endWeekdayNumber) {
                if (startDate > firstWeekDay) {
                    newEndDate("end", startWeekdayNumber, startDate)
                }
                if (startDate < firstWeekDay) {
                    newStartDate("start", endWeekdayNumber, endDate)
                }
            }

        })
        console.log("----------SetEvents donc Re-render----------");
        setEvents(dataReal);
    }





    useEffect(() => {
        setNextWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }))
        setPreviousWeek(DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }))

        const getEvents = async (date) => {
            try {
                const { data } = await getEventsOrganizer(date.toFormat("yyyy-MM-dd"));
                if (data) {
                    return data;
                }
            } catch (err) {
                console.error(err);
            }
        };
        const prepareDataEvents = async () => {
            const dataEvents = await getEvents(firstDayOfWeek).catch();
            checkWeekend(dataEvents, firstDayOfWeek)
        }

        prepareDataEvents()

    }, [firstDayOfWeek])

    useEffect(() => {
        const getDatas = async () => {
            const datas = await getPlacesOrganizer();
            setPlaces(datas);
        }
        getDatas();
    }, [])



    const calculateXPos = (dayNumber, eventHour) => {

        // adjustX returns 0 for before noon and 1 after noon
        const isAfternoon = ajustX(eventHour);

        for (let day = 1, shift = 0; day <= 5; day++, shift++) {
            if (dayNumber === day) {
                return (shift + day) + isAfternoon;
            }
        }
        return 1;
    }
    /**
     * TESTS pour Drag actions
     */
    const onDragStopTest = () => {
    }
    const onResizeStopTest = () => {
    }

    return (
        <>
            <GridLayout className="layout" cols={11} onDragStop={onDragStopTest} onResizeStop={onResizeStopTest} rowHeight={60} compactType={null} preventCollision={true} rows={8} width={windowWidth} maxRows={places.length + 1} >

                <div data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }} data-organizer-type="blank" key={uuid()} >
                    <div className="blank-row">
                        <div className="year">{firstDayOfWeek.year}</div>
                        <div>
                            <button className="weeks-button-left" onClick={changeToPreviousWeek}>&lt;</button>
                            <button className="weeks-button-right" onClick={changeToNextWeek}>&gt;</button>
                        </div>
                    </div>
                    <div className="row"></div>
                </div>

                <div data-grid={{ x: 1, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}> {firstDayOfWeek.plus({ days: 0 }).weekdayLong} {firstDayOfWeek.plus({ days: 0 }).day} {firstDayOfWeek.plus({ days: 0 }).monthLong}
                    <div className="column"></div> {/** For drawing externals borders in CSS */}
                    <div className="column-middle"></div> {/** For drawing middle borders in CSS */}
                </div>
                <div data-grid={{ x: 3, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}> {firstDayOfWeek.plus({ days: 1 }).weekdayLong} {firstDayOfWeek.plus({ days: 1 }).day} {firstDayOfWeek.plus({ days: 1 }).monthLong}
                    <div className="column"></div>
                    <div className="column-middle"></div>
                </div>
                <div data-grid={{ x: 5, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}> {firstDayOfWeek.plus({ days: 2 }).weekdayLong} {firstDayOfWeek.plus({ days: 2 }).day} {firstDayOfWeek.plus({ days: 2 }).monthLong}
                    <div className="column"></div>
                    <div className="column-middle"></div>
                </div>
                <div data-grid={{ x: 7, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}> {firstDayOfWeek.plus({ days: 3 }).weekdayLong} {firstDayOfWeek.plus({ days: 3 }).day} {firstDayOfWeek.plus({ days: 3 }).monthLong}
                    <div className="column"></div>
                    <div className="column-middle"></div>
                </div>
                <div data-grid={{ x: 9, y: 0, w: 2, h: 1, static: true }} data-organizer-type="column" key={uuid()}> {firstDayOfWeek.plus({ days: 4 }).weekdayLong} {firstDayOfWeek.plus({ days: 4 }).day} {firstDayOfWeek.plus({ days: 4 }).monthLong}
                    <div className="column"></div>
                    <div className="column-middle"></div>
                </div>


                {
                    places.map((item) => {
                        return (
                            <div data-grid={{ x: 0, y: (item.position + 1), w: 1, h: 1, static: true }} data-organizer-type="row" key={uuid()}>
                                {item.name}
                                <div className="row"></div>
                            </div>
                        )
                    })
                }

                {
                    places.length > 0 && events.length > 0 && events.map((event) => {

                        const startDayNumber = Number(UTCDate(event.start_date, "E"));
                        const startDayHour = UTCDate(event.start_date, "HH:mm");
                        const endDayHour = UTCDate(event.end_date, "HH:mm");
                        const formatedStartDate = UTCDate(event.start_date, "yyyy-MM-dd");
                        const formatedEndDate = UTCDate(event.end_date, "yyyy-MM-dd");

                        const verticalEventPos = Number(places[event.place_position].position + 1);

                        const x = calculateXPos(startDayNumber, startDayHour);
                        const w = defineCardWidth(formatedStartDate, startDayHour, formatedEndDate, endDayHour);

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
                                onClick={() => openModal(event)}
                            >
                                <div className="card-content">
                                    {event.name}
                                    <div className="card-content-time">
                                        <span>{startDayHour === "03:00" ? "... <= " : startDayHour}</span>
                                        <span>{endDayHour === "22:00" ? " => ..." : endDayHour}</span>
                                    </div>
                                </div>
                            </div>

                        )
                    })

                }

            </GridLayout>
            {modalIsOpen &&
                <MycourseModal modalIsOpen={modalIsOpen} openModal={openModal} datas={eventModal} />}

        </>
    )
}
