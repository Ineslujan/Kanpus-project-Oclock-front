import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { postConnexion } from '../../requests/connexionRequest';

import './connexionForm.scss'

export default function ConnexionForm() {
    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm({});
    const [state2, setState2]= useState()

    const onSubmit = data =>  {
        const getDatas = async () => {
            const datas = await postConnexion({
                data
            });
            if(datas.status === 200){
                setState(datas);
                setTabClasseRoom(datas.data.place);
                setCloseFormPart1(true);
            }
        } 
        getDatas();
        console.log(state2);
    }



  return (
    <form className="connexion-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="connexion-form-container">
            <label htmlFor="connexion-email" className="connexion-form-label">Email :</label> <br/>
            <input type="text" className="connexion-form-input" {...register("email", { required: true })} /> <br/>
            {errors.email && <span>Vous devez rentrer un email pour vous connecter</span>}
        </div>
        <div className="connexion-form-container">
            <label htmlFor="connexion-password" className="connexion-form-label">Mot de passe :</label> <br/>
            <input type="text" className="connexion-form-input" {...register("password", { required: true })} /> <br/>
            {errors.password && <span>Vous devez rentrer votre mot de passe pour vous connecter</span>}
        </div>
        <button className="connexion-form-button">Valider</button>
    </form>
  )
}
