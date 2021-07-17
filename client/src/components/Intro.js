import "../App.css";
import logo from "../dog.png";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="App">
      <h1>Henry Dogs SPA</h1>
      <img src={logo} alt="logo inicial" />
      <br />
      <Link to="/breeds">
        <button className="centerbut">Enter</button>
      </Link>
      <h1>by Federico OyB</h1>
    </div>
  );
}

export default Intro;
