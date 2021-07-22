import "../App.css";
import logo from "../dog.png";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="App">
      <div className="title">Henry Dogs SPA</div>
      <img src={logo} alt="logo inicial" />
      <br />
      <Link to="/breeds">
        <button className="centerbut">Enter</button>
      </Link>
      <div className="title">by Federico OyB</div>
    </div>
  );
}

export default Intro;
