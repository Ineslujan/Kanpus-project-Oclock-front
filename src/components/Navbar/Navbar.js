import React from 'react';
import { NavLink } from "react-router-dom";

import './navbar.scss';

export default function Navbar() {

    let activeClassName = "navlink activeStyle"

    return (
        <div className="navbar-container-link">
            <NavLink
                to="/add"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >+</NavLink>
            <NavLink
                to="/organizer"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Organiseur</NavLink>
            <NavLink
                to="/mycourse"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Mes cours</NavLink>
            <NavLink
                to="/trainee"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Stagiaires</NavLink>
            <NavLink
                to="/places"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Lieux</NavLink>
            <NavLink
                to="/promos"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Promos</NavLink>
            {/* <NavLink
                to="/groupes"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Groupes</NavLink> */}
            <NavLink
                to="/formateurs"
                className={({ isActive }) => isActive ? activeClassName : "navlink"}
            >Formateurs</NavLink>
        </div>
    )
}
