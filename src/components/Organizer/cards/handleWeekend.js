import { DateTime } from "luxon";

export const handleWeekend = (dataEvents, date, settings, firstDayOfWeek) => {
    const dataReal = dataEvents.map(event => {
        return { ...event }
    });
    const firstWeekDay = date; // monday 18th march
    const firstWeekDayWeekNumber = firstWeekDay.toFormat('WW'); // 23rd week
    const courseStartHourAm = DateTime.fromFormat(settings.course_start_hour_am, "TT").toFormat("T")+":01" // 09:00:01 change with settings
    const courseEndHourPm = DateTime.fromFormat(settings.course_end_hour_pm, "TT").toFormat("T")+":01" // 18:00:01 change with settings

    dataReal.forEach((d) => {
        const startDate = DateTime.fromISO(d.start_date) // Date and hour's Luxon format
        const endDate = DateTime.fromISO(d.end_date) // Date and hour's Luxon format
        const startWeekdayNumber = DateTime.fromISO(d.start_date).toFormat('c') // 3 (wednesday)
        const endWeekdayNumber = DateTime.fromISO(d.end_date).toFormat('c') // 6 (saturday)
        const startWeekNumber = DateTime.fromISO(d.start_date).toFormat('WW') // 23rd week
        const endWeekNumber = DateTime.fromISO(d.end_date).toFormat('WW') // 24rd week

        const diffEvent = endDate.diff(startDate, 'weeks') // difference in week between start and end date
        const gapWeek = diffEvent.weeks // if event is more than 1 week (1 or more) or not (0)

        const newStartDate = (weekdayNumber, date) => {
            // difference between monday and the day to remove for the new start date
            const toRemoveInStartDate = Math.abs(Number(weekdayNumber) - 1);
            const newDate = date.minus({ days: toRemoveInStartDate }).toFormat("yyyy-MM-dd")
            d.start_date = `${newDate}T${courseStartHourAm}.000Z`;
            return
        }

        const newEndDate = (weekdayNumber, date) => {
            // difference between friday and the day to add for the new end date
            const toAddInEndDate = Math.abs(Number(weekdayNumber) - 5);
            const newDate = date.plus({ days: toAddInEndDate }).toFormat("yyyy-MM-dd")
            d.end_date = `${newDate}T${courseEndHourPm}.000Z`;
            return
        }

        if (gapWeek >= 1) { // events more than a week
            if ((startWeekNumber === firstWeekDayWeekNumber && Number(startWeekdayNumber) === 6) || (startWeekNumber === firstWeekDayWeekNumber && Number(startWeekdayNumber) === 7)) {
                // if ((week23 === week23 && 6(saturday) === 6(saturday) || (week23 === week23 && 7(sunday) === 7(sunday))))
                // is the start day is a saturday or sunday ?
                console.log("START");
                d.start_date = `${firstDayOfWeek.plus({ days: 7 }).toFormat("yyyy-MM-dd")}T${courseStartHourAm}.000Z`;
            }
            else if ((endWeekNumber === firstWeekDayWeekNumber && Number(endWeekdayNumber) === 6) || (endWeekNumber === firstWeekDayWeekNumber && Number(endWeekdayNumber) === 7)) {
                // if ((week24 === week24 && 6(saturday) === 6(saturday) || (week24 === week24 && 7(sunday) === 7(sunday))))
                // is the end day is a saturday or sunday ?
                console.log("END");
                d.start_date = `${firstDayOfWeek.toFormat("yyyy-MM-dd")}T${courseStartHourAm}.000Z`;
                d.end_date = `${firstDayOfWeek.plus({ days: 4 }).toFormat("yyyy-MM-dd")}T${courseEndHourPm}.000Z`;
            }
            else if (startWeekNumber === firstWeekDayWeekNumber) {
                // (start date) weekdays except saturday or sunday
                console.log("start");
                newEndDate(startWeekdayNumber, startDate)
            }
            else if (endWeekNumber === firstWeekDayWeekNumber) {
                // (end date) weekdays except saturday or sunday
                console.log("end");
                newStartDate(endWeekdayNumber, endDate)
            }
            else {
                //! is it usefull ???
                console.log("start-end");
                d.start_date = `${firstDayOfWeek.toFormat("yyyy-MM-dd")}T${courseStartHourAm}.000Z`;
                d.end_date = `${firstDayOfWeek.plus({ days: 4 }).toFormat("yyyy-MM-dd")}T${courseEndHourPm}.000Z`;
            }
        }
        // events less than a week
        else if (startWeekdayNumber > endWeekdayNumber) { // 4 > 3 => Week from thursday to the next wednesday 
            if (firstWeekDay < startDate) {
                // monday 18 < thursday 21
                newEndDate(startWeekdayNumber, startDate)
            }
            if (startDate < firstWeekDay) {
                // wednesday 13 < monday 18
                newStartDate(endWeekdayNumber, endDate)
            }
        }
        else {
            if (Number(startWeekdayNumber) === 6 || Number(startWeekdayNumber) === 7) {
                // if it's a saturday or sunday for the start date
                d.start_date = `${firstDayOfWeek.plus({ days: 7 }).toFormat("yyyy-MM-dd")}T${courseStartHourAm}.000Z`;
            }
            else if (Number(endWeekdayNumber) === 6 || Number(endWeekdayNumber) === 7) {
                // if it's a saturday or sunday for the end date
                d.end_date = `${firstDayOfWeek.plus({ days: 4 }).toFormat("yyyy-MM-dd")}T${courseEndHourPm}.000Z`;

            }
        }

    })
    console.log("----------SetEvents donc Re-render----------");
    return dataReal;
}
