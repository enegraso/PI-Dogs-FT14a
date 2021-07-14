// main component of project
import "../styles/Home.css";
import Nav from "./Nav";
import Breeds from './Breeds'

function Home(props) {
  return (
    <>
      <Nav /> 
      <Breeds />
    </>
  );
}

export default Home;
