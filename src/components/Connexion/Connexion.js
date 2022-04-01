import React from 'react';
import Footer from '../Footer/Footer';
import ConnexionForm from '../ConnexionForm/ConnexionForm';


import './connexion.scss';

export default function Connexion() {

  return (
    <>
        <div className="connexion-container">
            <section className="connexion-container-left"></section>
            <section className="connexion-container-right">
                <ConnexionForm />
            </section>
        </div>
        <Footer />
    </>
  )
}
