import '../App.css';
import {Link} from 'react-router-dom'

function Intro() {
    return (
        <div className="App">
          <Link to='/breeds'>
          <button className="centerbut">Enter</button>
          </Link>
          <h1>Henry Dogs by Federico OyB</h1>
        </div>
      );
}

export default Intro