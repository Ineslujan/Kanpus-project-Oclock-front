import React from 'react';
import Footer from '../Footer/Footer';
import ConnexionForm from '../ConnexionForm/ConnexionForm';
import Kanpus from '../../assets/images/logo-kanpus.png'
import backgroundImage from '../../assets/images/img-connexion-2.jpg'

import './connexion.scss';

export default function Connexion() {

  return (
    <>
      <div className="navbar-logo-login"><img className="logo-kanpus" src={Kanpus} alt="logo-kanpus" /></div>
      <div className="connection-background-image"><img className="logo-kanpus" src={backgroundImage} alt="logo-kanpus" /></div>
     
       
        <div className="connexion-container">
            <section className="connexion-container-wrapper">

                <div className="connexion-form" >
                  <p className="connexion-container-title">IMCA Provence</p>
                  <ConnexionForm />
                </div>
            </section>
        </div>
        <Footer />
    </>
  )
}
