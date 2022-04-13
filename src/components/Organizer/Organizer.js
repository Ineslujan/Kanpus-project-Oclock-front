
import React, { useState, useEffect } from 'react';
import { DateTime, Interval } from "luxon";
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
    const [places, setPlaces] = useState([]);
    const [events, setEvents] = useState([]);
    console.log(events);

    const changeToPreviousWeek= () => {
        console.log("-----changement de semaine-----");
        setFirstDayOfWeek(firstDayOfWeek => DateTime.fromJSDate(new Date(firstDayOfWeek)).minus({ days: 7 }));
    };

    const changeToNextWeek= () => {
        console.log("-----changement de semaine-----");
        setFirstDayOfWeek(firstDayOfWeek => DateTime.fromJSDate(new Date(firstDayOfWeek)).plus({ days: 7 }));
    };

    const UTCDate = (date, format) => {
        return DateTime.fromISO(date).setLocale("fr").toUTC().toFormat(format);
    }








    /**
     * WEEKEND
     * décomposer les jours de l'evenement
     * Si samedi (6) et dimanche (7) traversé entièrement => soustraire 2 * 2
     * Si  commence un samedi ou dimanche : supprimer directement le ou les jour entier
     * Recomposer la carte avant le weekend
     * Recomposer la carte après le weekend
     * */
    const checkWeekend = (dataEvents, date) => {
        const dataReal = dataEvents.map(event => {
            return {...event}
        });
        const firstWeekDay = date;
        
        // data.start_date = `${newStartDate.year}-${newStartDate.month}-${newStartDate.day} ${startTime}:00 ${newStartDate.offsetNameShort}`;
        
        dataReal.forEach((d) => {
            const objectStartDate = DateTime.fromISO(d.start_date).toObject();
            const objectEndDate = DateTime.fromISO(d.end_date).toObject();
            const startDateEventDay = DateTime.fromISO(d.start_date)
            const endDateEventDay = DateTime.fromISO(d.end_date)
            const startDateEventWeekday = DateTime.fromISO(d.start_date).toFormat('c')
            const endDateEventWeekday = DateTime.fromISO(d.end_date).toFormat('c')
            
            const diffEvent = endDateEventDay.diff(startDateEventDay, 'weeks')
            const gapWeek = diffEvent.weeks
            
            if (gapWeek >= 1) {
                
            }
            else if (startDateEventWeekday > endDateEventWeekday) {
                if (startDateEventDay > firstWeekDay) {

                    const toAddInEndDate = Math.abs(Number(startDateEventWeekday) - 5);
                    const newDate = startDateEventDay.plus({days : toAddInEndDate}).toFormat("yyyy-MM-dd")
                    d.end_date = `${newDate}T22:00:00.000Z`;
                }
                if (startDateEventDay < firstWeekDay) {

                    const toRemoveInStartDate = Math.abs(Number(endDateEventWeekday) - 1);
                    const newDate = endDateEventDay.minus({days : toRemoveInStartDate}).toFormat("yyyy-MM-dd")
                    d.start_date = `${newDate}T03:00:00.000Z`;
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

        for(let day = 1,  shift = 0; day <= 5; day++, shift++) {
            if(dayNumber === day) {
                return (shift+day) + isAfternoon;
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

        <GridLayout className="layout" cols={11} onDragStop={onDragStopTest} onResizeStop={onResizeStopTest} rowHeight={60} compactType={null} preventCollision={true} rows={8} width={windowWidth} maxRows={places.length + 1} >

            <div data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }} data-organizer-type="blank" key="blank" >
                <div className="blank-row">
                    <div className="year">{firstDayOfWeek.year}</div>
                    <div>
                        <button className="weeks-button-left" onClick={changeToPreviousWeek}>&lt;</button>
                        <button className="weeks-button-right" onClick={changeToNextWeek}>&gt;</button>
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
                places.map((item) => {
                    return (
                        <div data-grid={{ x: 0, y: (item.position + 1), w: 1, h: 1, static: true }} data-organizer-type="row" key={`${item.id + item.name}`}>
                            {item.name}
                            <div className="row"></div>
                        </div>
                    )
                })
            }
            {
                places.length > 0 && events.length > 0 && events.map((event) => {

                    console.log(event);
                    const startDayNumber = Number(UTCDate(event.start_date, "E"));
                    const startDayHour = UTCDate(event.start_date, "HH:mm");
                    const endDayHour = UTCDate(event.end_date, "HH:mm");
                    const formatedStartDate = UTCDate(event.start_date, "yyyy-MM-dd");
                    const formatedEndDate = UTCDate(event.end_date, "yyyy-MM-dd");

                    const verticalEventPos = Number(places[event.place_position].position + 1);
                    
                    const x = calculateXPos(startDayNumber, startDayHour);
                    const w = defineCardWidth(formatedStartDate, startDayHour, formatedEndDate, endDayHour);
                    event.event_id === 17 && console.log("X =>",x,"W =>",w)

                    return (
                        <div data-grid={{
                            x,
                            y: verticalEventPos,
                            w,
                            h: 1,
                            maxH: 1
                            }}
                            data-organizer-type="card"
                            style={{ backgroundColor: event.former[0].color }}
                            key={Math.random()}
                        >
                            <div className="card-content">
                                {event.name}
                                <div className="card-content-time">
                                    <span>{startDayHour}</span>
                                    <span>{endDayHour}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </GridLayout>
    )
}
