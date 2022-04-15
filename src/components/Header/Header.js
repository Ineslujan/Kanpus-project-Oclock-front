import React from 'react';
import useWindowDimensions from '../../customHooks/getWindowDimensions';

import Logo from '../Atoms/Logo/Logo'
import UserName from '../Atoms/UserName/UserName'
import Navbar from '../Navbar/Navbar'
import BurgerMenu from '../Atoms/BurgerMenu/BurgerMenu'

import './header.scss';

export default function Header() {
    const { height, width } = useWindowDimensions(); 

    return (
        <div className="navbar-container">
            <Logo />
            {width < 599 ? "": <Navbar />}
            <UserName />
            {width < 599 ? <BurgerMenu /> : ""}
        </div>
    )
}
