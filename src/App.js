import {Routes, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import useWindowDimensions from '../src/customHooks/getWindowDimensions';

import Connexion from './components/Connexion/Connexion';
import AddClasses from './components/AddClasses/AddClasses'
import Organizer from './components/Organizer/Organizer';
import MyCourse from './components/MyCourse/MyCourse';

function App() {

  const { height, width } = useWindowDimensions();


  return (
    <div className="App">

      {/* <Connexion width={width} /> */}
      {width < 599 ? "":<Navbar />}
      <Routes>
        <Route path='/' element={<Connexion/>} />
        <Route path='/add' element={<AddClasses />} />
        <Route path='/organizer' element={<Organizer />} />
        <Route path='/mycourse' element={<MyCourse />} />
      </Routes>
    </div>
  );
}

export default App;
