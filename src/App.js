import {Routes, Route} from 'react-router-dom';
import React, {useContext} from 'react';
import { AuthenticationContext } from './context/authenticationContext';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import useWindowDimensions from '../src/customHooks/getWindowDimensions';

import Connexion from './components/Connexion/Connexion';
import AddClasses from './components/AddClasses/AddClasses'
import Organizer from './components/Organizer/Organizer';
import MyCourse from './components/MyCourse/MyCourse';
import Trainee from'./components/Trainee/Trainee';
import ClasseRoom from './components/ClasseRoom/ClasseRoom';

import Group from './components/Group/Group';

function App() {

  const { height, width } = useWindowDimensions(); 
  const { authentication, setAuthentication } = useContext(AuthenticationContext);

  return (
    <div className="App">

      {/* <Connexion width={width} /> */}
      {width < 599 ? "":<Navbar />}
      <Routes>
        <Route path='/' element={<Connexion/>} />
        <Route path='/add' element={<AddClasses />} />
        <Route path='/organizer' element={<Organizer />} />
        <Route path='/mycourse' element={<MyCourse />} />
        {/* <Route path='/mycourse' element={authentication.role === 'trainee' ? <MyCourse />: "vous n'avez pas acces a cette page"} /> */}
        <Route path='/trainee' element={<Trainee />} />
        <Route path='/places' element={<ClasseRoom />} />
        <Route path='/groupes' element={<Group />} />
      </Routes>
    </div>
  );
}

export default App;
