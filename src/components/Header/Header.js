import React, {useState} from 'react';
import useWindowDimensions from '../../customHooks/getWindowDimensions';

import Logo from '../Atoms/Logo/Logo'
import UserName from '../Atoms/UserName/UserName'
import Navbar from '../Navbar/Navbar'
import BurgerMenu from '../Atoms/BurgerMenu/BurgerMenu'

import './header.scss';

export default function Header() {
    const { height, width } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
        <div className="navbar">
            <div className="navbar-container">
                <Logo />
                {width < 599 ? "" : <Navbar />}
                <UserName />
            </div>
            {width < 599 && <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
        {width < 599 && <Navbar isOpen={isOpen} />}
        </>
    )
}
