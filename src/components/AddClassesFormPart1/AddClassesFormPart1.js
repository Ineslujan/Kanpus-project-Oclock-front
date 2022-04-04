import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import PickDate from '../DatePicker/PickDate';
import TimePicker from '../TimePicker/TimePicker';
import { DateTime } from "luxon";

import { requestEvent } from '../../requests/AddClassesFormRequest';

export default function AddClassesFormPart1({ setAllDatasForm, setTabTeachers, setTabClasseRoom, setCloseFormPart1, closeFormPart1}) {

    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm({});
    const watchName = watch("name");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startTime, setStartTime] = useState('9:00');
    const [endTime, setEndTime] = useState('17:30');
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const [valideButton, setValidateButton] = useState(false);
    
    let newStartDate = DateTime.fromJSDate(startDate);
    let newEndDate = DateTime.fromJSDate(endDate);

    useEffect(() => {
        if(!newStartDate.day || !newEndDate.day || !watchName ){
            setValidateButton(false);
        } else {
            setValidateButton(true);
        }       
    }, [newStartDate.day, newEndDate.day, watchName ]);

    const onSubmit = data =>  {
        data.start_date = `${newStartDate.year}-${newStartDate.month}-${newStartDate.day} ${startTime}:00 ${newStartDate.offsetNameShort}`;
        data.end_date = `${newEndDate.year}-${newEndDate.month}-${newEndDate.day} ${endTime}:00 ${newEndDate.offsetNameShort}`;
        
        setAllDatasForm({
            name: data.name,
            start_date: data.start_date,
            end_date: data.start_date,
        })
        const getDatas = async () => {
            const datas = await requestEvent({
                name: data.name,
                start_date: data.start_date,
                end_date: data.start_date,
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
                <div className="data-open-container">
                    <button className="date-open" onClick={()=> setCloseFormPart1(false)}>{watchName}</button>
                    <button className="date-open" onClick={()=> setCloseFormPart1(false)}>{`${newStartDate.weekdayLong} ${newStartDate.day}  ${newStartDate.monthLong} ${newStartDate.year} ${startTime}`}</button>
                    <button className="date-open" onClick={()=> setCloseFormPart1(false)}>{`${newEndDate.weekdayLong} ${newEndDate.day} ${newEndDate.monthLong} ${newEndDate.year} ${endTime}`}</button>
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
                    {valideButton ? <button className="date-form-button">Valider</button> : <button className="date-form-button" disabled>Valider</button>}
                </form>
            }
        </>
    )
}
