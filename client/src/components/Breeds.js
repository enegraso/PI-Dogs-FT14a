import style from '../styles/Breed.module.css'
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBreedsAll,
  getBreed,
  getTemperaments,
  sort,
  filtroTemp,
} from "../actions";
import { Link } from 'react-router-dom'

function Breeds(props) {

  // preparar el control para el formulario de seleccion de raza
  const [input, setInput] = useState({
    breed: "",
  })

  // preparar el paginado
  const [pagBreeds, setPagBreeds] = useState(1);

  const itemsPPage = 8;
  const totalItems = pagBreeds * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const view = props.raza.slice(inicialItems, totalItems);

  console.log(props.raza.slice(inicialItems, totalItems))

  useEffect(() => {
    filtraBreed();
  }, []);

  function filtraBreed() {
    props.getBreedsAll();
  }

  return (
    <>
      <div className={style.container}>
      {view &&
        view.map((raza) => (
          <div className={style.card} key={raza.id}>
            <Link to={`/details/${raza.id}`}>
              <img src={raza.img} className={style.imagen} />
            </Link>
            <h2>{raza.name}</h2>
            <p>{raza.temperament}</p>
          </div>
        ))}
        </div>
        <div className={style.btnPaginado}>
        <button onClick={() => setPagBreeds(pagBreeds - 1)}> 👈 </button>
        <button>{pagBreeds}</button>
        <button onClick={() => setPagBreeds(pagBreeds + 1)}> 👉 </button>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    raza: state.breeds,
    temperament: state.temperament,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreed: (elem) => dispatch(getBreed(elem)),
    getBreedsAll: (elem) => dispatch(getBreedsAll(elem)),
    getTemperaments: (elem) => dispatch(getTemperaments(elem)),
    sort: (elem1, elem2) => dispatch(sort(elem1, elem2)),
    filtroTemp: (elem1, elem2) => dispatch(filtroTemp(elem1, elem2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
