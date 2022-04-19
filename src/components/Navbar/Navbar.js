import React from 'react';
import { NavLink } from "react-router-dom";
import Calendar from '../../assets/images/icones-bags-svg/bi-calendar-plus-fill.svg';
import './navbar.scss';

export default function Navbar({ isOpen }) {

    let activeClassName = "navlink activeStyle"
    console.log("grrr",isOpen);

    return (
        <div className={isOpen ? "navbar-container-link open" : "navbar-container-link"}>
            <NavLink
                to="/add"
                className={({ isActive }) => isActive ? activeClassName : "navlink-add"}
            >{isOpen ? "Créer un cours" : <img src={Calendar} alt="calendar" class="create-event-color" />}</NavLink>
            <NavLink
                to="/organizer"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Organiseur</NavLink>
            <NavLink
                to="/mycourse"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Mes cours</NavLink>
            <NavLink
                to="/trainee"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Stagiaires</NavLink>
            <NavLink
                to="/former"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Formateurs</NavLink>
            <NavLink
                to="/places"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Lieux</NavLink>
            <NavLink
                to="/promos"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Promos</NavLink>
        </div>
    )
}
