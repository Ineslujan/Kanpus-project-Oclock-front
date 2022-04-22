import React, {useState, useEffect} from 'react';
import { allUsersSettings } from '../../requests/aboutSettings';

import './footer.scss';


export default function Footer() {

    
    const [address, setAddress] = useState("Résidence de l'étoile - 27 boulevard Roger Ricca - 84700 SORGUES");
    const [phoneNumber, setPhoneNumber] = useState("04-90-86-15-37");
    const [email, setEmail] = useState("Mail: info@imca-provence.com");

    useEffect(() => {
        const handleSettings = async () => {
            const allSettings = await allUsersSettings();
            if (allSettings.status === 200) {
                console.log("settings footer", allSettings);
                setAddress(allSettings.data.address);
                setPhoneNumber(allSettings.data.phoneNumber);
                setEmail(allSettings.data.email);
            }
        }
        handleSettings();
    }, [])
  



    return (
        <footer className='footer-container'>
            <p className="footer-container-adress">{address}</p>
            <p className="footer-container-phone">{phoneNumber}</p>
            <p className="footer-container-email">{email}</p>
        </footer>
    )
}
