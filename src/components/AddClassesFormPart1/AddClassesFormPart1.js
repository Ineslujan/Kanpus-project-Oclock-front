import React, {useState, useEffect, useContext} from 'react';
import PickDate from '../DatePicker/PickDate';
import TimePicker from '../TimePicker/TimePicker';
import { DateTime } from "luxon";
import { requestEvent } from '../../requests/addClassesFormRequest';
import { AuthenticationContext } from '../../context/authenticationContext';

export default function AddClassesFormPart1({ 
    setAllDatasForm, 
    setTabTeachers, 
    setTabClasseRoom, 
    setCloseFormPart1, closeFormPart1,
    startDate, setStartDate,
    endDate, setEndDate,
    startTime, setStartTime,
    endTime, setEndTime,
    editDatas,
    courseName,
    setCourseName,
    eventId,
    closePart1
}) {
        const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const [valideButton, setValidateButton] = useState(false);

    const [dataMod, setDataMod] = useState(null)
    
    let newStartDate = DateTime.fromJSDate(startDate);
    let newEndDate = DateTime.fromJSDate(endDate);

    useEffect(() => {
    //     if(courseEditName && startEditCourse && endEditCourse){
    //         setStartDate(startEditCourse);
    //         setEndDat
    //     }
    //    setStartDate(DateTime.fromISO(startEditCourse).toUTC())
    //    setEndDate(DateTime.fromISO(endEditCourse).toUTC())
    //  console.log(DateTime.fromISO(editDatas.start_date).toUTC())

    // setEndDate(editDatas.end_date)
    // if(editDatas.length > 0){  
    //     setDataMod(editDatas)
    //     console.log("edition mod", dataMod)
    //     console.log("edition", editDatas)
        console.log("datamod",dataMod)
    //}
  
    }, [editDatas])
    

    useEffect(() => {
        // console.log(startDate)
        if(!newStartDate.day || !newEndDate.day || !courseName ){
            setValidateButton(false);
        } else {
            setValidateButton(true);
        }       
    }, [newStartDate.day, newEndDate.day, courseName ]);

    const changeName = (e) => {
        setCourseName(e.target.value);
        console.log(e.target.value)
    }

    const onSubmit = (e) =>  {
        e.preventDefault()
        const start_date = `${newStartDate.year}-${newStartDate.month}-${newStartDate.day} ${startTime}:00 `;
        const end_date = `${newEndDate.year}-${newEndDate.month}-${newEndDate.day} ${endTime}:00 `;
        console.log(start_date)
        setAllDatasForm({
            name: courseName,
            start_date: start_date,
            end_date: end_date,
        })
        const getDatas = async () => {
            console.log(eventId);
            const datas = await requestEvent(eventId, {
                name: courseName,
                start_date: start_date,
                end_date: end_date,
            }, authentication.token);
            if(datas.status === 200){
                setTabTeachers(datas.data.former);
                setTabClasseRoom(datas.data.place);
                setCloseFormPart1(true);
            }
        } 
        getDatas();
    }

    return (
        <>
            {closeFormPart1 ? 
                <div className="data-open-container"onClick={closePart1}>
                    <button className="date-open" >{courseName}</button>
                    <button className="date-open" >{`${newStartDate.weekdayLong} ${newStartDate.day}  ${newStartDate.monthLong} ${newStartDate.year} ${startTime}`}</button>
                    <button className="date-open" >{`${newEndDate.weekdayLong} ${newEndDate.day} ${newEndDate.monthLong} ${newEndDate.year} ${endTime}`}</button>
                </div>
            :
                <form className="create-date-form" onSubmit={onSubmit}>
                    <div className="create-date-form-container">
                        <label htmlFor="create-date-name" className="create-date-name-label">Nom du cours</label>
                        <input type="text" className="create-date-form-input" value={courseName} onChange={changeName} />
                    </div>   
                    <label htmlFor="create-date-name" className="create-date-name-label">Choisissez une date</label>
                    <div className="calendar-datepicker">                        
                        <PickDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />                                              
                    </div>
                    <label htmlFor="create-date-name" className="create-date-name-label">Horaires</label>
                    <div className="create-date-form-time-container">
                        {showStartTimePicker ? <TimePicker time={startTime} setTime={setStartTime} setShowPicker={setShowStartTimePicker} /> : <button className="date-time-button" onClick={()=> setShowStartTimePicker(true)}>{startTime}</button> }
                        {showEndTimePicker ? <TimePicker  time={endTime} setTime={setEndTime} setShowPicker={setShowEndTimePicker} /> : <button className="date-time-button"  onClick={()=> setShowEndTimePicker(true)}>{endTime}</button> }
                    </div>
                    {valideButton ? <button className="date-form-button">Valider</button> : <button className="date-form-button" disabled>Valider</button>}
                </form>
            }
        </>
    )
}
