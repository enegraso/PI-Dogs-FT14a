import style from "../styles/Breed.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBreedsAll,
  getBreed,
  getTemperaments,
  sort,
  filtroTemp,
  ASC,
  DES,
} from "../actions";
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
  const cantPages = Math.ceil(props.raza.length / itemsPPage);
  const view = props.raza.slice(inicialItems, totalItems); //props.raza.slice(inicialItems, totalItems);
  var todosItems

  console.log(props.temperament.length,props.temperament,props.raza.length, inicialItems, totalItems, cantPages);

  useEffect(() => {
    filtraBreed();
    filtraTempe();
  }, []);

  function filtraBreed() {
    props.getBreedsAll();
  }

  function filtraTempe() {
    props.getTemperaments();
  }

  // manejo input de filtro de razas
  function handleInput(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  {/*  Handle para Filtrar por raza */}
  function handleDispatchBreeds(e) {
    props.getBreed(e.target.value);
    setPagBreeds(1) // ir a página 1 si me encuentro en una que no existe en filtro de raza
  }

  {/*  Handle para Ordenar las razas */}
  function handleDispatchOrder(event) {
    if (event.target.value === ASC || event.target.value === DES) {
      props.sort(event.target.value, props.raza);
    }
  }

  {/*  Handle para Buscar por raza */}
  function handleDispatchBreed(e) {
    e.preventDefault();
    if (input.raza) {
      // busco raza por cadena de texto en input
      props.getBreed(input.raza);
    } else {
      // dejando el input de raza vacio limpio busqueda anterior
      props.getBreedsAll()
    }
    setPagBreeds(1) // ir a página 1 si me encuentro en una que no existe en la busqueda de raza
  }

function handleDispatchTempe(e) {
  // props.getBreedsAll() 
    props.filtroTemp(props.filtrada, e.target.value);
    setPagBreeds(1) // ir a página 1 si me encuentro en una que no existe en el filtro
  }


  return (
    <>
      <div className={style.optBar}>{/*   Barra con las opciones de filtros, busquedas y ordenamientos */}
      {/*  Filtrar por raza */}
        <select
          name="selectBreed"
          value={input.selectBreed}
          onChange={handleDispatchBreeds}
          className={style.fRaza}
        >
          <option value="">Breeds</option>
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
              <option value={elem.name}>{elem.name}</option>
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
          <option value={ASC}>Upward</option>
          <option value={DES}>Descendant</option>
        </select>
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
    filtrada: state.auxBreeds
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
