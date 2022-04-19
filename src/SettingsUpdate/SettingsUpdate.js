import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

export default function SettingsUpdate({isOpen, seeUpdate, data}) {
    Modal.setAppElement(document.getElementById('root'));

    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm(
        { defaultValues: { 
            name: data.name, 
            email: data.email,
            phone_number: data.phone_number,
            address: data.address,
            course_start_hour_am: data.course_start_hour_am,
            course_end_hour_am: data.course_end_hour_am,
            course_start_hour_pm: data.course_start_hour_pm,
            course_end_hour_pm: data.course_end_hour_pm
        }}
    )

    const onSubmit = data => {
        console.log(data)
    }
  return (
    <Modal
        isOpen={isOpen}
    >
        <div className="modal-confirmation-delete">
            <button className="close" onClick={seeUpdate}>x</button>
        </div>  
        <form className="settings-update-form" onSubmit={handleSubmit(onSubmit)}>
            <>
                <label htmlFor="name" className="settings-label">Choisissez le nom de l'établissement</label> <br/>
                <input type="text" className="settings-input" {...register("name", { required: true })} /> <br/>
                {errors.name && <span>Vous devez rentrer un nom pour l'établissement</span>}
            </> 
            <>
                <label htmlFor="email" className="settings-label">Choisissez l'email de l'établissement</label> <br/>
                <input type="email" className="settings-input" {...register("email", { required: true })} /> <br/>
                {errors.email && <span>Vous devez rentrer l'email de l'établissement</span>}
            </> 
            <>
                <label htmlFor="phone" className="settings-label">Choisissez le numéro de téléphone de l'établissement</label> <br/>
                <input type="text" className="settings-input" {...register("phone_number", { required: true })} /> <br/>
                {errors.phone_number && <span>Vous devez rentrer le numéro de téléphone de l'établissement</span>}
            </> 
            {/* <>
            gerer l'image
            </> */}
            <>
                <label htmlFor="address" className="settings-label">Choisissez l'adresse de l'établissement</label> <br/>
                <input type="text" className="settings-input" {...register("address", { required: true })} /> <br/>
                {errors.address && <span>Vous devez rentrer l'adresse de l'établissement</span>}
            </> 
            <>
                <label htmlFor="course_start_hour_am" className="settings-label">Choisissez l'heure de début des cours du matin</label> <br/>
                <input type="text" className="settings-input" {...register("course_start_hour_am", { required: true })} /> <br/>
                {errors.course_start_hour_am && <span>Vous devez rentrer l'heure de début des cours du matin</span>}
            </> 
            <>
                <label htmlFor="course_end_hour_am" className="settings-label">Choisissez l'heure de fin des cours du matin</label> <br/>
                <input type="text" className="settings-input" {...register("course_end_hour_am", { required: true })} /> <br/>
                {errors.course_end_hour_am && <span>Vous devez rentrer l'heure de fin des cours du matin</span>}
            </> 
            <>
                <label htmlFor="course_start_hour_pm" className="settings-label">Choisissez l'heure de début des cours de l'aprés midi</label> <br/>
                <input type="text" className="settings-input" {...register("course_start_hour_pm", { required: true })} /> <br/>
                {errors.course_start_hour_pm && <span>Vous devez rentrer l'heure de début des cours de l'aprés midi</span>}
            </> 
            <>
                <label htmlFor="course_end_hour_pm" className="settings-label">Choisissez l'heure de fin des cours de l'aprés midi</label> <br/>
                <input type="text" className="settings-input" {...register("course_end_hour_pm", { required: true })} /> <br/>
                {errors.course_end_hour_pm && <span>Vous devez rentrer l'heure de fin des cours de l'aprés midi</span>}
            </> 

            <button>Valider</button>
        </form>
    </Modal>
  )
}
