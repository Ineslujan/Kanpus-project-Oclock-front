import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthenticationContext } from './context/authenticationContext';
import './App.css';
import './app.scss';

import Header from './components/Header/Header';

import Connexion from './components/Connexion/Connexion';
import AddClasses from './components/AddClasses/AddClasses'
import Organizer from './components/Organizer/Organizer';
import MyCourse from './components/MyCourse/MyCourse';
import Trainee from './components/Trainee/Trainee';
import ClasseRoom from './components/ClasseRoom/ClasseRoom';
import Former from './components/Former/Former';
import Promos from './components/Promos/Promos';
import WrongRoute from './components/WrongRoute/WrongRoute';

import Group from './components/Group/Group';

function App() {

    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    return (
        <div className="App">
            
            {authentication.logged && <Header />}
            <Routes>
                <Route path='/' element={<Connexion />} />
                <Route path='/add' element={(authentication.role === "admin" || authentication.role === "former" )? <AddClasses /> : <WrongRoute />} />
                <Route path='/organizer' element={(authentication.role === "admin" || authentication.role === "former" )? <Organizer /> : <WrongRoute />} />
                <Route path='/mycourse' element={(authentication.role === "admin" || authentication.role === "former" || authentication.role === "trainee" )? <MyCourse /> : <WrongRoute />} />
                {/* <Route path='/mycourse' element={authentication.role === 'trainee' ? <MyCourse />: "vous n'avez pas acces a cette page"} /> */}
                <Route path='/trainee' element={(authentication.role === "admin" || authentication.role === "former" )? <Trainee /> : <WrongRoute />} />
                <Route path='/places' element={(authentication.role === "admin" || authentication.role === "former" )? <ClasseRoom /> : <WrongRoute />} />
                <Route path='/former' element={authentication.role === "admin" ? <Former />: <WrongRoute />} />
                <Route path='/promos' element={(authentication.role === "admin" || authentication.role === "former" )? <Promos /> : <WrongRoute />} />
                <Route path='/*' element={<WrongRoute />} />
            </Routes>
        </div>
    );
}

export default App;
