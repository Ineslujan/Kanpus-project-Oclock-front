import { DateTime } from "luxon";

export const defineTimeExtremity = (endMorning, startAfternoon) => {
    // define the break's middle time. example (12:30 < 13:15 < 14:00)
    //calculate the middle time of the break (13:15)
    const middleLunchBreak = Number(DateTime.fromISO(startAfternoon).diff(DateTime.fromISO(endMorning), 'minutes').toObject().minutes) / 2;
    const middleLunchBreakTime = DateTime.fromISO(endMorning).plus({ minutes: middleLunchBreak }).toFormat("HH:mm")
    
    // define the times extremities (90min before and after the middle time) (11:45 <- 13:15 -> 14:45)
    const breakStartExtremity = DateTime.fromISO(middleLunchBreakTime).minus({ minutes: 90 }).toFormat("HH:mm")
    const breakEndExtremity = DateTime.fromISO(middleLunchBreakTime).plus({ minutes: 90 }).toFormat("HH:mm")
    
    return { breakStartExtremity: breakStartExtremity, middleLunchBreakTime: middleLunchBreakTime, breakEndExtremity: breakEndExtremity }
}

export const defineCardWidth = (dateStartDay, dateStartTime, dateEndDay, dateEndTime, settings) => {
    // find the difference between the days
    const diffDays = DateTime.fromISO(dateEndDay).diff(DateTime.fromISO(dateStartDay), 'days').toObject().days;
    // 0 for the same day ; -1 because the extremities are defined after ; *2 for more a day
    const wDiff = diffDays > 0 ? (diffDays - 1) * 2 : 0;

    // Is the start Date begins in the morning or afternoon : 
    // false = AM ; true = PM ; to use in result
    const isStartDateBeginsPM = defineMorningOrAfternoon(dateStartTime, "start", settings);

    // Is the end Date begins in the morning or afternoon : 
    // end date : false = AM ; true = PM ; to use in result
    const isEndDateBeginsPM = defineMorningOrAfternoon(dateEndTime, "end", settings);

    // Calculate the whole card's width
    return wDiff + (diffDays === 0 ?
        (
            isEndDateBeginsPM ?
                (
                    (isStartDateBeginsPM && isEndDateBeginsPM) ? 1 : 2
                ) : 1
        ) : (
            (isStartDateBeginsPM ? 1 : 2) + (isEndDateBeginsPM ? 2 : 1)
        )
    );
}

export const defineMorningOrAfternoon = (time, period, settings) => {
    // false = AM ; true = PM

    const endMorning = DateTime.fromFormat(settings.course_end_hour_am, "TT").toFormat("T")
    const startAfternoon = DateTime.fromFormat(settings.course_start_hour_pm, "TT").toFormat("T")
    
    let ToSuppr

    // for start dates
    if (period === "start") {
        // compare if : start break's time extremity < DATE'S TIME < break's middle time
        if ((DateTime.fromISO(defineTimeExtremity(endMorning, startAfternoon).breakStartExtremity) < DateTime.fromISO(time)) && (DateTime.fromISO(defineTimeExtremity(endMorning, startAfternoon).middleLunchBreakTime) > DateTime.fromISO(time))) {
            // AM to suppr
            ToSuppr = true;
        }
        // just to know if : break's middle time < DATE'S TIME (false = AM ; true = PM)
        else {
            ToSuppr = DateTime.fromISO(defineTimeExtremity(endMorning, startAfternoon).middleLunchBreakTime) < DateTime.fromISO(time);
        }
    }

    // for end dates
    else if (period === "end") {

        // compare if : break's middle time < DATE'S TIME < end break's time extremity
        if ((DateTime.fromISO(defineTimeExtremity(endMorning, startAfternoon).breakEndExtremity) > DateTime.fromISO(time)) && (DateTime.fromISO(defineTimeExtremity(endMorning, startAfternoon).middleLunchBreakTime) < DateTime.fromISO(time))) {
            // PM to suppr
            ToSuppr = false;
        }
        // just to know if : break's middle time < DATE'S TIME (false = AM ; true = PM)
        else {
            ToSuppr = DateTime.fromISO(defineTimeExtremity(endMorning, startAfternoon).middleLunchBreakTime) < DateTime.fromISO(time);
        }
    }

    return ToSuppr
}

export const ajustX = (time, settings) => {
    const isPm = defineMorningOrAfternoon(time, "start", settings)
    // add 1 or 0 if it's AM or PM
    return isPm ? 1 : 0;
}

export const calculateXPos = (dayNumber, eventHour, setting) => {//! est ce bon apres fix des heures setting ??

    // adjustX returns 0 for before noon and 1 after noon
    const isAfternoon = ajustX(eventHour, setting);

    for (let day = 1, shift = 0; day <= 5; day++, shift++) {
        if (dayNumber === day) {
            return (shift + day) + isAfternoon;
        }
    }
    return 1;
}