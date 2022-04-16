import React from 'react';
import { NavLink } from "react-router-dom";
import Calendar from '../../assets/images/icones-bags-svg/bi-calendar-plus-fill.svg';
import './navbar.scss';

export default function Navbar() {

    let activeClassName = "navlink activeStyle"

    return (
        <div className="navbar-container-link">
            <NavLink
                to="/add"
                className={({ isActive }) => isActive ? activeClassName : "navlink-add"}
            ><img src={Calendar} alt="calendar" class="create-event-color" /></NavLink>
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
                to="/places"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Lieux</NavLink>
            <NavLink
                to="/promos"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Promos</NavLink>
            {/* <NavLink
                to="/groupes"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Groupes</NavLink> */}
            <NavLink
                to="/former"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            >Formateurs</NavLink>
        </div>
    )
}
