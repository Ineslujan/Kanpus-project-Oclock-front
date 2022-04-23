import React from 'react';

import './footer.scss';


export default function Footer({address, phoneNumber, email}) {


    return (
        <footer className='footer-container'>
            <p className="footer-container-adress">{address}</p>  
            <p className="footer-container-phone">{phoneNumber}</p> 
            <p className="footer-container-email">{email}</p>
        </footer>
    )
}
