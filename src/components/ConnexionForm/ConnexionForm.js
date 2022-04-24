import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { postConnexion } from '../../requests/connexionRequest';
import { AuthenticationContext } from '../../context/authenticationContext';
import { useNavigate } from 'react-router-dom';

import './connexionForm.scss'

export default function ConnexionForm({ name }) {
    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm({});
    const [ connexionError, setConnexionError] = useState(false);
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    
    const navigate = useNavigate();

    const onSubmit = data =>  {
        const getDatas = async () => {
            try{
                const datas = await postConnexion(data);
                if(datas.status === 200){
                    setConnexionError(false); 
                    setAuthentication({
                        role: datas.data.user.role,
                        token: datas.headers.authorization,
                        user: datas.data.user,
                        logged: datas.data.logged
                    })
                    datas.data.user.role === "trainee" && navigate("/mycourse")
                    datas.data.user.role === "former" && navigate("/organizer")
                    datas.data.user.role === "admin" && navigate("/organizer")
                    
                } 
            } catch (error) {
                console.log(error);
                setConnexionError(true)
            }
        } 
        getDatas();
    }



  return (
    <form className="connexion-form-" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="connexion-form-container">
            <label htmlFor="connexion-email" className="connexion-form-label">Email :</label> <br/>
            <input type="text" className="connexion-form-input"  {...register("email", { required: true })} /> <br/>
            {errors.email && <span className="connexion-input-error">Vous devez rentrer un email pour vous connecter</span>}
        </div>
        <div className="connexion-form-container">
            <label htmlFor="connexion-password" className="connexion-form-label">Mot de passe :</label> <br/>
            <input type="text" className="connexion-form-input"  {...register("password", { required: true })} /> <br/>
            {errors.password && <span className="connexion-input-error">Vous devez rentrer votre mot de passe pour vous connecter</span>}
        </div>
        <button className="connexion-form-button">Valider</button>

        {connexionError &&
            <div className="connexion-error">
                <p>Vous avez rentré un mauvais e-mail et/ou un mauvais mot de passe</p>
            </div>
        }
        
    </form>
  )
}
