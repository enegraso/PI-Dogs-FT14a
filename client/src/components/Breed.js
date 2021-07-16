import style from '../styles/Breed.module.css'
import {Link} from 'react-router-dom'

function Breed({ id, breed, image, temperaments }) {
  return (
    <>
      <Link to={`/detail/${id}`}>
        <img src={image} className={style.imagen} />
      </Link>
      <h2>{breed}</h2>
      <p>{temperaments}</p>
    </>
  );
}

export default Breed;
