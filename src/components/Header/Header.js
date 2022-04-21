import React, {useState} from 'react';
import useWindowDimensionsWithScrollbar from '../../customHooks/getWindowDimensionsWithScrollbar';

import Logo from '../Atoms/Logo/Logo'
import UserName from '../Atoms/UserName/UserName'
import Navbar from '../Navbar/Navbar'
import BurgerMenu from '../Atoms/BurgerMenu/BurgerMenu'

import './header.scss';

export default function Header() {
    const { height, width } = useWindowDimensionsWithScrollbar();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div className="navbar">
            <div className="navbar-container">
                <Logo />
                {width < 599 ? "" : <Navbar />}
                <UserName isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            {width <= 599 && <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
        {width <= 599 && <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    )
}
