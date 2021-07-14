import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Intro from './components/Intro'
import Breeds from './components/Breeds'
import AddBreed from "./components/AddBreed";

function App() {
  return (
    <>
      <Route path="/" exact component={Intro} />
      <Route path="/home" component={Home} />
      <Route path='/home'><Breeds/></Route>
      <Route path="/addbreed" component={AddBreed} />
{/*       <Route path="/detalles/:id" component={Detalles} />
      <Route path="/crearRaza" component={Form} /> */}
    </>
  );
}

export default App;
