import style from "../styles/AddBreed.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTemperaments } from "../actions/index";
import fetch from "node-fetch";

function AddBreed(props) {
  const [input, setInput] = useState({
    name: "",
    heightmin: 0,
    heightmax: 0,
    weightmin: 0,
    weightmax: 0,
    years: 0
  });

  useEffect(() => {
    handleDispatch();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("http://localhost:3001/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleDispatch() {
    props.getTemperaments();
  }

  return (
    <>
      <h1>Create breed form</h1>
      <form onSubmit={handleSubmit} className={style.formul}>
        <div>
          <input
            placeholder="Name"
            type="text"
            name="name"
            required="required"
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <select name="nameTempe" value={input.nameTempe} onChange={handleChange} required>
          <option value="">Temperaments</option>
          {props.temperament && props.temperament.map(elem => (
            <option value={elem.id}>{elem.name}</option>
          ))}
        </select>


        <input type="submit" value="Create Race" />
      </form>
    </>
  );
}

function mapStateToProps(state) {
  return {
    temperament: state.temperament,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTemperaments: (elem) => dispatch(getTemperaments(elem)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBreed);
