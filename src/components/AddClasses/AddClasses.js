import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PickDate from '../ConnexionForm/DatePicker/PickDate';
import { DateTime } from "luxon";

export default function AddClasses() {

    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm({});
    const watchName = watch("name")
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onSubmit = data =>  {
        let newStartDate = DateTime.fromJSDate(startDate);
        let newEndDate = DateTime.fromJSDate(endDate);
        data.startDate = `${newStartDate.year}-${newStartDate.month}-${newStartDate.day} 15:30:00 ${newStartDate.offsetNameShort}`
        data.endDate = `${newEndDate.year}-${newEndDate.month}-${newEndDate.day} 18:30:00 ${newEndDate.offsetNameShort}`
        console.log(data);
    }

  return (

    <div className="create-classes-container">
        <form className="create-date-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="create-date-form-container">
                <label htmlFor="create-date-name" className="create-date-name-label">Nom du cours</label> <br/>
                <input type="text" className="create-date-form-input" {...register("name", { required: true })} /> <br/>
                {errors.email && <span>Vous devez rentrer un nom pour ce cours</span>}
            </div>
            <PickDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <button className="connexion-form-button">Valider</button>
        </form>

        {startDate && endDate && watchName ? <div>WOLOLOLOLO</div>:""}
    </div>
  )
}
