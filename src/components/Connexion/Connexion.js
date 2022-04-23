import React from 'react';
import Footer from '../Footer/Footer';
import ConnexionForm from '../ConnexionForm/ConnexionForm';
import Kanpus from '../../assets/images/logo-kanpus.png'

import './connexion.scss';

export default function Connexion() {

  return (
    <>
      <div className="navbar-logo-login"><img className="logo-kanpus" src={Kanpus} alt="logo-kanpus" /></div>
        <div className="connexion-container">
            <section className="connexion-container-wrapper">
                
                <ConnexionForm />
            </section>
        </div>
        <Footer />
    </>
  )
}
