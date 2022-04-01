import {Routes, Route} from 'react-router-dom';
import './App.css';
import Connexion from './components/Connexion/Connexion';
import Navbar from './components/Navbar/Navbar';
import useWindowDimensions from '../src/customHooks/getWindowDimensions';


import Organizer from './components/Organizer/Organizer';

function App() {

  const { height, width } = useWindowDimensions();


  return (
    <div className="App">

      {/* <Connexion width={width} /> */}
      {width < 599 ? "":<Navbar />}
      <Routes>
        <Route path='/' element={<Connexion/>} />
        <Route path='/organizer' element={<Organizer />} />
      </Routes>
    </div>
  );
}

export default App;
