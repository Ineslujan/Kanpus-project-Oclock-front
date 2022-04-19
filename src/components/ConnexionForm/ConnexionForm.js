import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { postConnexion } from '../../requests/connexionRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import { useNavigate } from 'react-router-dom';

import './connexionForm.scss'

export default function ConnexionForm() {
    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm({});
    const [state2, setState2]= useState();
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    
    const navigate = useNavigate();

    const onSubmit = data =>  {
        const getDatas = async () => {
            const datas = await postConnexion(data);
            if(datas.status === 200){
                setState2(datas);
                console.log(datas)
                setAuthentication({
                    role: datas.data.user.role,
                    token: datas.headers.authorization
                })
                datas.data.user.role === "trainee" && navigate("/mycourse")
                datas.data.user.role === "former" && navigate("/organizer")
                datas.data.user.role === "admin" && navigate("/organizer")
                
            }
        } 
        getDatas();
        console.log(authentication);
    }



  return (
    <form className="connexion-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="connexion-form-container">
            <label htmlFor="connexion-email" className="connexion-form-label">Email :</label> <br/>
            <input type="text" className="connexion-form-input" value="admin2@gmail.com" {...register("email", { required: true })} /> <br/>
            {errors.email && <span>Vous devez rentrer un email pour vous connecter</span>}
        </div>
        <div className="connexion-form-container">
            <label htmlFor="connexion-password" className="connexion-form-label">Mot de passe :</label> <br/>
            <input type="text" className="connexion-form-input" value="kanpus" {...register("password", { required: true })} /> <br/>
            {errors.password && <span>Vous devez rentrer votre mot de passe pour vous connecter</span>}
        </div>
        <button className="connexion-form-button">Valider</button>
    </form>
  )
}
