// main component of project
import style from "../styles/Home.css";
import Nav from "./Nav";
import Breeds from "./Breeds";

function Home(props) {
  return (
    <>
      <Nav />
      <Breeds />
    </>
  );
}

export default Home;
