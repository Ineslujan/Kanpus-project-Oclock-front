import React, {useState, useEffect} from 'react';
import PickDate from '../DatePicker/PickDate';
import TimePicker from '../TimePicker/TimePicker';
import { DateTime } from "luxon";
import { requestEvent } from '../../requests/AddClassesFormRequest';

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
    setCourseName
    }) {

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
        const start_date = `${newStartDate.year}-${newStartDate.month}-${newStartDate.day} ${startTime}:00 ${newStartDate.offsetNameShort}`;
        const end_date = `${newEndDate.year}-${newEndDate.month}-${newEndDate.day} ${endTime}:00 ${newEndDate.offsetNameShort}`;
        setAllDatasForm({
            name: courseName,
            start_date: start_date,
            end_date: end_date,
        })
        const getDatas = async () => {
            const datas = await requestEvent({
                name: courseName,
                start_date: start_date,
                end_date: end_date,
            });
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
                <div className="data-open-container"onClick={()=> setCloseFormPart1(false)}>
                    <button className="date-open" >{courseName}</button>
                    <button className="date-open" >{`${newStartDate.weekdayLong} ${newStartDate.day}  ${newStartDate.monthLong} ${newStartDate.year} ${startTime}`}</button>
                    <button className="date-open" >{`${newEndDate.weekdayLong} ${newEndDate.day} ${newEndDate.monthLong} ${newEndDate.year} ${endTime}`}</button>
                </div>
            :
                <form className="create-date-form" onSubmit={onSubmit}>
                    <div className="create-date-form-container">
                        <label htmlFor="create-date-name" className="create-date-name-label">nom du cours</label>
                        <input type="text" className="create-date-form-input" value={courseName} onChange={changeName} />
                    </div>

                    <label htmlFor="create-date-name" className="create-date-name-label">choisissez une date</label>
                    <PickDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                    <label htmlFor="create-date-name" className="create-date-name-label">horaires</label>

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
