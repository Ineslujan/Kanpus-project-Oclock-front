import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PickDate from '../DatePicker/PickDate';
import TimePicker from '../TimePicker/TimePicker';
import { DateTime } from "luxon";
import AddClassesMenu from '../AddClassesMenu/AddClassesMenu';

import './addClasses.scss'

export default function AddClasses() {

    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm({});
    const watchName = watch("name");

    const [closeFormPart1, setCloseFormPart1] = useState(false);
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startTime, setStartTime] = useState('9:00');
    const [endTime, setEndTime] = useState('13:30');
    const [showStartTimePicker, setShowStartTimePicker]= useState(false)
    const [showEndTimePicker, setShowEndTimePicker]= useState(false)
    
    let newStartDate = DateTime.fromJSDate(startDate);
    let newEndDate = DateTime.fromJSDate(endDate);

    const [valideButton, setValidateButton] = useState(false);
    const [closeFormPart2, setCloseFormPart2] = useState(true)

    useEffect(() => {
        if(!newStartDate.day || !newEndDate.day ||!watchName ){
            setValidateButton(false);
        } else {
            setValidateButton(true);
        }       
    }, [newStartDate.day, newEndDate.day, watchName ]);

    useEffect(() => {
        if(!closeFormPart1){
            setCloseFormPart2(true)
        } else {
            setCloseFormPart2(false)
        }
    }, [closeFormPart1]);
    
    

    const onSubmit = data =>  {
        data.start_date = `${newStartDate.year}-${newStartDate.month}-${newStartDate.day} ${startTime}:00 ${newStartDate.offsetNameShort}`;
        data.end_date = `${newEndDate.year}-${newEndDate.month}-${newEndDate.day} ${endTime}:00 ${newEndDate.offsetNameShort}`;
        setCloseFormPart1(true);
        console.log(data);
        console.log(newStartDate);
    }

  return (

    <div className="create-classes-container">
        {closeFormPart1 ? 
            <div className="data-open-container">
                <button className="date-open" onClick={()=> setCloseFormPart1(false)}>{watchName}</button>
                <button className="date-open" onClick={()=> setCloseFormPart1(false)}>{`${newStartDate.weekdayShort} ${newStartDate.day}  ${newStartDate.monthShort} ${newStartDate.year} ${startTime}`}</button>
                <button className="date-open" onClick={()=> setCloseFormPart1(false)}>{`${newEndDate.weekdayShort} ${newEndDate.day} ${newEndDate.monthShort} ${newEndDate.year} ${endTime}`}</button>
            </div>
        :
            <form className="create-date-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="create-date-form-container">
                    <label htmlFor="create-date-name" className="create-date-name-label">nom du cours</label>
                    <input type="text" className="create-date-form-input" {...register("name", { required: true })} />
                    {errors.email && <span>Vous devez rentrer un nom pour ce cours</span>}
                </div>

                <label htmlFor="create-date-name" className="create-date-name-label">choisissez une date</label>
                <PickDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                <label htmlFor="create-date-name" className="create-date-name-label">horaires</label>

                <div className="create-date-form-time-container">
                    {showStartTimePicker ? <TimePicker time={startTime} setTime={setStartTime} setShowPicker={setShowStartTimePicker} /> : <button className="date-time-button" onClick={()=> setShowStartTimePicker(true)}>{startTime}</button>}
                    {showEndTimePicker ? <TimePicker  time={endTime} setTime={setEndTime} setShowPicker={setShowEndTimePicker} /> : <button className="date-time-button"  onClick={()=> setShowEndTimePicker(true)}>{endTime}</button>}
                </div>
                {valideButton ? <button className="date-form-button" >Valider</button> : <button className="date-form-button" disabled>Valider</button>}
            </form>
        }

        {!closeFormPart2 ? 
        <div className="container-form-part2">
            <AddClassesMenu />
        </div>
        : ""}
    </div>
  )
}
