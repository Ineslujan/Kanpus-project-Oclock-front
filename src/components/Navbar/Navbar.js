import React from 'react';
import { NavLink } from "react-router-dom";
import useWindowDimensionsWithScrollbar from '../../customHooks/getWindowDimensionsWithScrollbar';

import Calendar from '../../assets/images/icones-bags-svg/bi-calendar-plus-fill.svg';
import './navbar.scss';

export default function Navbar({ isOpen, setIsOpen }) {
    const { height, width } = useWindowDimensionsWithScrollbar();

    let activeClassName = "navlink activeStyle"
    const handleOpeningMenu = () => {
        width <= 599 && setIsOpen(!isOpen)
    }

    return (
        <div className={isOpen ? "navbar-container-link open" : "navbar-container-link"}>
            <NavLink
                to="/add"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-add"}
            ><button onClick={handleOpeningMenu}>{isOpen ? "Créer un cours" : <img src={Calendar} alt="calendar" className="create-event-color" />}</button></NavLink>
            <NavLink
                to="/organizer"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Organiseur</button></NavLink>
            <NavLink
                to="/mycourse"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Mes cours</button></NavLink>
            <NavLink
                to="/trainee"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Stagiaires</button></NavLink>
            <NavLink
                to="/former"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Formateurs</button></NavLink>
            <NavLink
                to="/places"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Lieux</button></NavLink>
            <NavLink
                to="/promos"
                // onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Promos</button></NavLink>
        </div>
    )
}
