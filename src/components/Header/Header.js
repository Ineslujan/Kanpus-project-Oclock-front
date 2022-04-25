import React, {useState, useContext} from 'react';
import useWindowDimensionsWithScrollbar from '../../customHooks/getWindowDimensionsWithScrollbar';
import { AuthenticationContext } from '../../context/authenticationContext';


import Logo from '../Atoms/Logo/Logo'
import UserName from '../Atoms/UserName/UserName'
import Navbar from '../Navbar/Navbar'
import BurgerMenu from '../Atoms/BurgerMenu/BurgerMenu'

import './header.scss';

export default function Header() {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    const { height, width } = useWindowDimensionsWithScrollbar();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div className="navbar">
            <div className="navbar-container">
                <Logo />
                {(authentication.role === "admin" || authentication.role === "former" ) && width > 599 && <Navbar />}
                <UserName isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            {(authentication.role === "admin" || authentication.role === "former" ) && width <= 599 && <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
        {(authentication.role === "admin" || authentication.role === "former" ) && width <= 599 && <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    )
}
