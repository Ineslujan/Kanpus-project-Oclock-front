import './App.css';
import Connexion from './components/Connexion/Connexion';
import useWindowDimensions from '../src/customHooks/getWindowDimensions'

function App() {

  const { height, width } = useWindowDimensions();


  return (
    <div className="App">

      <Connexion width={width} />
    </div>
  );
}

export default App;
