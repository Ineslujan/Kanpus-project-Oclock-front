import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../../assets/images/404/404-opt.gif'
import backgroundImageBubble from '../../assets/images/404/404bulle-opt.gif'

import './WrongRoute.scss';

export default function WrongRoute() {
    const [wrongPage, setWrongPage] = useState(backgroundImage)
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useeffetc");
        if (wrongPage === backgroundImage) {
            console.log("default");
            setTimeout(()=>{
                setWrongPage(backgroundImageBubble)
            },30030)
        }
        if (wrongPage === backgroundImageBubble) {
            console.log("bubble");
            setTimeout(()=>{
                setWrongPage(backgroundImage)
            },10010)
        }
    }, [wrongPage])

    const handleClick = () => {
        navigate("/")
    }

    return (
        <>

            <div className="wrongRoute-container">
                <section className="wrongRoute-container-wrapper">

                    <div className="wrongRoute-form" >
                        <button onClick={handleClick} className='wrongRoute-form-button'>Accueil</button>
                    </div>
                </section>
            </div>
            <div className="wrongRoute-background-image"><img className="logo-404" src={wrongPage} alt="logo-kanpus" /></div>
        </>
    )
}

// 10.01sec =10010MS