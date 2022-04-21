import React, {useEffect, useContext} from 'react';
import { NavLink } from "react-router-dom";
import useWindowDimensionsWithScrollbar from '../../customHooks/getWindowDimensionsWithScrollbar';
import { AuthenticationContext } from '../../context/authenticationContext';

import Calendar from '../../assets/images/icones-bags-svg/bi-calendar-plus-fill.svg';
import './navbar.scss';

export default function Navbar({ isOpen, setIsOpen }) {
    const { height, width } = useWindowDimensionsWithScrollbar();

    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    let activeClassName = "navlink activeStyle"
    const handleOpeningMenu = () => {
        width <= 599 && setIsOpen(!isOpen)
    }

    useEffect(() => {
      console.log(authentication)
    }, [])
    

    return (
        <div className={isOpen ? "navbar-container-link open" : "navbar-container-link"}>
            {(authentication.role === "admin" || authentication.role === "former") &&
            <>
            <NavLink
                to="/add"
                className={({ isActive }) => isActive ? activeClassName : "navlink-add"}
            ><button onClick={handleOpeningMenu}>{isOpen ? "Créer un cours" : <img src={Calendar} alt="calendar" className="create-event-color" />}</button></NavLink>
            <NavLink
                to="/organizer"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Organiseur</button></NavLink>
            </>
            }
            {(authentication.role === "admin" || authentication.role === "former" ||uthentication.role === "trainee" ) &&
            <NavLink
                to="/mycourse"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Mes cours</button></NavLink>
        }
            {(authentication.role === "admin" || authentication.role === "former") &&
            <>
            <NavLink
                to="/trainee"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Stagiaires</button></NavLink>
            </>
            }
            {authentication.role === "admin" &&
                <NavLink
                    to="/former"
                    className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
                ><button onClick={handleOpeningMenu}>Formateurs</button></NavLink>
            }
            {(authentication.role === "admin" || authentication.role === "former") &&
            <>
            <NavLink
                to="/places"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Lieux</button></NavLink>
            <NavLink
                to="/promos"
                className={({ isActive }) => isActive ? activeClassName : "navlink-section"}
            ><button onClick={handleOpeningMenu}>Promos</button></NavLink>
            </>
            }
        </div>
    )
}
