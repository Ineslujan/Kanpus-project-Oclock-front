import React from 'react'
import TimeKeeper from 'react-timekeeper';

export default function TimePicker({ time, setTime, setShowPicker }) {

    const closeTimePicker = () => {
        setShowPicker(false)
        console.log("youhou")
    }

    return (
        <TimeKeeper
            time={time}
            onChange={(newTime) => setTime(newTime.formatted24)}
            hour24Mode
            switchToMinuteOnHourSelect
            // closeOnMinuteSelect={() => setShowPicker(false)} 
            onDoneClick={() => closeTimePicker()}
        />
    )
}
