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
import Promos from './components/Promos/Promos'

import Group from './components/Group/Group';

function App() {

    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<Connexion />} />
                <Route path='/add' element={<AddClasses />} />
                <Route path='/organizer' element={<Organizer />} />
                <Route path='/mycourse' element={<MyCourse />} />
                {/* <Route path='/mycourse' element={authentication.role === 'trainee' ? <MyCourse />: "vous n'avez pas acces a cette page"} /> */}
                <Route path='/trainee' element={<Trainee />} />
                <Route path='/places' element={<ClasseRoom />} />
                <Route path='/former' element={<Former />} />
                <Route path='/promos' element={<Promos />} />
            </Routes>
        </div>
    );
}

export default App;
