import React from 'react';
import { NavLink } from "react-router-dom";
import Calendar from '../../assets/images/icones-bags-svg/bi-calendar-plus-fill.svg';
import './navbar.scss';

export default function Navbar({ isOpen, setIsOpen }) {

    let activeClassName = "navlink activeStyle"
    const handleOpeningMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={isOpen ? "navbar-container-link open" : "navbar-container-link"}>
            <NavLink
                to="/add"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-add"}
            >{isOpen ? "Créer un cours" : <img src={Calendar} alt="calendar" className="create-event-color" />}</NavLink>
            <NavLink
                to="/organizer"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Organiseur</NavLink>
            <NavLink
                to="/mycourse"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Mes cours</NavLink>
            <NavLink
                to="/trainee"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Stagiaires</NavLink>
            <NavLink
                to="/former"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Formateurs</NavLink>
            <NavLink
                to="/places"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Lieux</NavLink>
            <NavLink
                to="/promos"
                onClick={handleOpeningMenu}
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Promos</NavLink>
        </div>
    )
}
