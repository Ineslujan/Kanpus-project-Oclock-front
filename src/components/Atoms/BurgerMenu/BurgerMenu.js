import React from 'react';
import './burgerMenu.scss';

export default function BurgerMenu({ isOpen, setIsOpen }) {

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
            <div id="nav-icon1" onClick={handleClick} className={isOpen ? "open" : ""} >
                <span></span>
                <span></span>
                <span></span>
            </div>
    )
}