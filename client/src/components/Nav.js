// Navigation bar of project
import styles from "../styles/Nav.module.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className={styles.navbar}>
      <Link to="/home">Home</Link>
      <Link to="/addbreed">Create Breed</Link>
    </div>
  );
}

export default Nav;
