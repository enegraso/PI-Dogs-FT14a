import style from "../styles/Breed.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBreedsAll,
  getBreed,
  getTemperaments,
  sort,
  filtroTemp,
} from "../actions";
import { Link } from "react-router-dom";
import Breed from "./Breed";

function Breeds(props) {
  // preparar el control para el formulario de seleccion de raza
  const [input, setInput] = useState({
    breed: "",
  });

  // preparar el paginado
  const [pagBreeds, setPagBreeds] = useState(1); // comienza en página 1

  const itemsPPage = 8;
  const totalItems = pagBreeds * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = totalItems / itemsPPage;
  const view = props.raza.slice(inicialItems, totalItems);

  // console.log(props.raza.slice(inicialItems, totalItems));

  useEffect(() => {
    filtraBreed();
  }, []);

  function filtraBreed() {
    props.getBreedsAll();
  }

  return (
    <>
      <div className={style.btnPaginado}>
        <button onClick={() => { pagBreeds > 1 ? setPagBreeds(pagBreeds - 1) : setPagBreeds(1) }}> 👈 </button>
        <button>{pagBreeds}</button>
        <button onClick={() => { pagBreeds < cantPages ? setPagBreeds(pagBreeds + 1) : setPagBreeds(cantPages)}}> 👉 </button>
      </div>
      <div className={style.container}>
        {view &&
          view.map((raza) => (
            <div className={style.card} key={raza.id}>
              <Breed
                id={raza.id}
                image={raza.img}
                temperaments={raza.temperament}
                breed={raza.name}
              />
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
