import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ConnexionForm from '../ConnexionForm/ConnexionForm';


import './connexion.css';

export default function Connexion() {


 
  return (
    <>
        <Navbar />
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
