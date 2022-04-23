import React,{useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import ConnexionForm from '../ConnexionForm/ConnexionForm';
import { allUsersSettings } from '../../requests/aboutSettings';

import './connexion.scss';

export default function Connexion() {

  const [address, setAddress] = useState("Résidence de l'étoile - 27 boulevard Roger Ricca - 84700 SORGUES");
  const [phoneNumber, setPhoneNumber] = useState("04-90-86-15-37");
  const [email, setEmail] = useState("Mail: info@imca-provence.com");
  const [name, setName] = useState('IMCA provence');

    useEffect(() => {
        const handleSettings = async () => {
            const allSettings = await allUsersSettings();
            if (allSettings.status === 200) {
                setName(allSettings.data.name)
                setAddress(allSettings.data.address);
                setPhoneNumber(allSettings.data.phone_number);
                setEmail(allSettings.data.email);
            }
        }
        handleSettings();
    }, [])

  return (
    <div className='connexion'>

        <div className="connexion-container">
            
            <section className="connexion-container-left"></section>
            <section className="connexion-container-right">
                <div className="connexion-name">
                    <p className="name">{name}</p>
                </div>
                <ConnexionForm />
            </section>
        </div>
        <Footer address={address} phoneNumber={phoneNumber} email={email} />
    </div>
  )
}
