import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Intro from './components/Intro'
import Breeds from './components/Breeds'
import AddBreed from "./components/AddBreed";
import Detail from "./components/Detail";

function App() {
  return (
    <>
      <Route path="/" exact component={Intro} />
      <Route path="/home" component={Home} />
      <Route path='/breeds'><Breeds/></Route>
      <Route path="/addbreed" component={AddBreed} />
      <Route path="/detail/:id" component={Detail} />
{/*      <Route path="/crearRaza" component={Form} /> */}
    </>
  );
}

export default App;
