import React from 'react';
import './logo.scss';
import Kanpus from '../../../assets/images/logo-kanpus.png'

export default function Logo() {

    return (

		<div className="navbar-logo"><img className="logo-kanpus" src={Kanpus} alt="logo-kanpus" /></div>

    )
}