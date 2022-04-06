import React from 'react';
import { NavLink } from "react-router-dom";

import './navbar.scss';

export default function Navbar() {

  let activeStyle = {
    textDecoration: "underline",
    color: 'red',
  };

  return (
    <div className="navbar-container">
		<div className="navbar-logo">Kanpus</div>
		<div className="navbar-container-link">
			<NavLink
				className="navlink"
				to="/add"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>+</NavLink>
			<NavLink
				className="navlink"
				to="/organizer"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Organiseur</NavLink>
			<NavLink
				className="navlink"
				to="/mycourse"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Mes cours</NavLink>
			<NavLink
				className="navlink"
				to="/stagiaires"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Stagiaires</NavLink>
			<NavLink
				className="navlink"
				to="/places"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Lieux</NavLink>
			<NavLink
				className="navlink"
				to="/promos"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Promos</NavLink>
			<NavLink
				className="navlink"
				to="/groupes"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Groupes</NavLink>
			<NavLink
				className="navlink"
				to="/formateurs"
				style={({ isActive }) => isActive ? activeStyle: undefined}
			>Formateurs</NavLink>
       	</div>
		<div className="navbar-user">Jean-Kevin</div>
    </div>
  )
}
