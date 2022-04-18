import style from "../styles/Breed.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBreedsAll,
  getBreed,
  getTemperaments,
  sort,
  sortweight,
  filtroTemp,
  ASC,
  DES,
  PASC,
  PDES,
  sortspan,
  TASC,
TDESC
} from "../actions";
import Breed from "./Breed";
import { Link } from "react-router-dom";

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
  const cantPages = Math.ceil(props.raza.length / itemsPPage);
  const view = props.raza.slice(inicialItems, totalItems); //props.raza.slice(inicialItems, totalItems);

  useEffect(() => {
    filtraBreed();
    filtraTempe();
  }, []);

  function filtraBreed() {
    if (props.breeds.length < 1)
    props.getBreedsAll();
  }

  function filtraTempe() {
    if (props.temperaments.length < 1)
    props.getTemperaments();
  }

  // manejo input de filtro de razas
  function handleInput(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

 /*  Handle para Filtrar por raza */
 function handleDispatchBreeds(e) {
    props.getBreed(e.target.value);
    setPagBreeds(1); // ir a página 1 si me encuentro en una que no existe en filtro de raza
  }

    /*  Handle para Ordenar las razas */
  function handleDispatchOrder(event) {
    console.log(event, props.raza);
    if (event.target.value === ASC || event.target.value === DES) {
      props.sort(event.target.value, props.raza);
    }
    if (event.target.value === PASC || event.target.value === PDES) {
      props.sortweight(event.target.value, props.raza);
    }
  }


    /*  Handle para Buscar por raza */
  function handleDispatchBreed(e) {
    e.preventDefault();
    if (input.raza) {
      // busco raza por cadena de texto en input
      props.getBreed(input.raza);
    } else {
      // dejando el input de raza vacio limpio busqueda anterior
      props.getBreedsAll();
    }
    setPagBreeds(1); // ir a página 1 si me encuentro en una que no existe en la busqueda de raza
  }

  function handleDispatchTempe(e) {
    // si hay valor en temperament hago el filtro
    if (e.target.value) {
      props.filtroTemp(props.filtrada, e.target.value);
    } 
    // si no hay valor tomo todas las razas 
    else {
      props.getBreedsAll();
    }
    setPagBreeds(1); // ir a página 1 si me encuentro en una que no existe en el filtro
  }

  if (props.raza.length === 0) {
    return (
      <img
        className={style.imgloader}
        src="https://i.gifer.com/ZZ5H.gif"
        alt="loader"
      />
    );
  }

  return (
    <>
      <div className={style.optBar}>
        {/*   Barra con las opciones de filtros, busquedas y ordenamientos */}
        {/*  Filtrar por raza */}
        <select
          name="selectBreed"
          value={input.selectBreed}
          onChange={handleDispatchBreeds}
          className={style.fRaza}
        >
          <option key="0" value="">
            Breeds
          </option>
          {props.raza &&
            props.raza.map((elem) => (
              <option key={elem.id}>{elem.name}</option>
            ))}
        </select>
        {/*  Filtrar por temperamento */}
        <select
          name="nameTempe"
          value={input.nameTempe}
          onChange={handleDispatchTempe}
          className={style.fTemp}
        >
          <option value="">Temperaments</option>
          {props.temperament &&
            props.temperament.map((elem) => (
              <option key={elem.name} value={elem.name}>
                {elem.name}
              </option>
            ))}
        </select>
        {/*  Buscar raza específica */}
        <form className={style.formul} onSubmit={handleDispatchBreed}>
          <div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Breeds"
              name="raza"
              value={input.raza}
              onChange={handleInput}
            />
          </div>
          <button className={style.btn} type="submit">
            🔍
          </button>
        </form>
        <div className={style.btnPaginado}>
          <button onClick={() => setPagBreeds(1)}>⬅</button>
          <button
            onClick={() => {
              pagBreeds > 1 ? setPagBreeds(pagBreeds - 1) : setPagBreeds(1);
            }}
          >
            {" "}
            👈{" "}
          </button>
          <label>
            page {pagBreeds} of {Math.round(cantPages)}
          </label>
          <button
            onClick={() => {
              pagBreeds < cantPages
                ? setPagBreeds(pagBreeds + 1)
                : setPagBreeds(cantPages);
            }}
          >
            {" "}
            👉{" "}
          </button>
          <button onClick={() => setPagBreeds(cantPages)}>➡</button>
        </div>
        <select onChange={handleDispatchOrder} className={style.fOrder}>
          <option>Ordering</option>
          <option value={ASC}>Name ASC</option>
          <option value={DES}>Name DESC</option>
          <option value={PASC}>Weight ASC</option>
          <option value={PDES}>Weight DESC</option>
        </select>
      </div>
      <div>
        <Link to="/addbreed">
          <button className={style.centerbut}> Add Breed </button>
        </Link>
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
    </>
  );
}

function mapStateToProps(state) {
  return {
    raza: state.breeds,
    temperament: state.temperament,
    filtrada: state.auxBreeds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreed: (elem) => dispatch(getBreed(elem)),
    getBreedsAll: (elem) => dispatch(getBreedsAll(elem)),
    getTemperaments: (elem) => dispatch(getTemperaments(elem)),
    sort: (elem1, elem2) => dispatch(sort(elem1, elem2)),
    sortweight: (elem1, elem2) => dispatch(sortweight(elem1, elem2)),
    filtroTemp: (elem1, elem2) => dispatch(filtroTemp(elem1, elem2)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
