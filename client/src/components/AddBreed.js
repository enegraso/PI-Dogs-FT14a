import style from "../styles/AddBreed.module.css";
import React, { useState } from "react";
import { connect } from "react-redux";

function AddBreed(props) {
  const [input, setInput] = useState({
    name: "",
    heightmin: 0,
    heightmax: 0,
    weightmin: 0,
    weightmax: 0,
    yearsmin: 0,
    yearsmax: 0,
    temper: [],
  });
  const [errors, setErrors] = React.useState({});

  function goBack() {
    window.history.go(-1);
  }

  // Elimino el useEffect, ya que los datos de razas y temperamentos los tengo en el state
/*   useEffect(() => {
    // props.getBreedsAll()
    // handleDispatch();
  }, []); */

  function validate(input) {
    var encontrado = props.namesRaza.find((breed) => breed.name.toLowerCase() === input.name.toLowerCase());
    let errors = {};
    if (!input.name || input.name === "") {
      errors.name = "breed is required";
    } else if (input.name.length < 2) {
      errors.name = "breed is too short";
    } else if (encontrado) {
      errors.name = "this breed alrady exist!"
    }
    if (!input.heightmin) {
      errors.heightmin = "Min heigth is required";
    }
    if (!input.heightmax) {
      errors.heightmax = "Max heigth is required";
    }
    if (!input.weightmin) {
      errors.weightmin = "Min weigth is required";
    }
    if (!input.weightmax) {
      errors.weightmax = "Max weigth is required";
    }
    if (!input.yearsmin) {
      errors.yearsmin = "Min years span life is required";
    }
    if (!input.yearsmax) {
      errors.yearsmax = "Max years span life is required";
    }
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.entries(errors).length > 0) {
      console.log(errors);
      alert("Please, complete the form");
    } else {
      // await fetch("http://localhost:3001/dogs", {
      await fetch("http://192.168.0.7:3001/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
        .then((response) => response.json())
        .then((json) => {
          JSON.stringify(json);
          console.log(json, errors.length);
          document.getElementById("form").reset();
          setInput({
            name: "",
            heightmin: 0,
            heightmax: 0,
            weightmin: 0,
            weightmax: 0,
            yearsmin: 0,
            yearsmax: 0,
            temper: [],
          });
          alert("Breed created succesfully");
        });
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChangeSelect(e) {
    var tempera = input.temper.find((temp) => temp === e.target.value);
    if (!tempera && e.target.value !== "0") {
      let data = [...input.temper];
      data.push(e.target.value);
      setInput({ ...input, temper: data });
      var seltempe = document.getElementById("selectempe");
      var strtempe = seltempe.options[seltempe.selectedIndex].text;
      var artempes = document.getElementById("areatempe");
      artempes.value += artempes.value.length > 0 ? ", " + strtempe : strtempe;
      console.log("estas seleccionando:" + data);
    } else alert("El temperamento ya fue agregado");
  }

  return (
    <>
      <div className={style.title}>Create breed form</div>
      <div className={style.cajaform}>
        <form onSubmit={handleSubmit} id="form">
          <div className={style.cajalabel}>
            <div><label>Breed's name</label></div>
            <div><label>Heigth min:</label></div>
            <div><label>Heigth max:</label></div>
            <div><label>Weigth min:</label></div>
            <div><label>Weigth max:</label></div>
            <div><label>Years min:</label></div>
            <div><label>Years max:</label></div>
            <div><label>Temperaments</label></div>
          </div>
          <div className={style.cajafields}>
            <div>
              <input
                className={errors.name && style.danger}
                placeholder="Name"
                type="text"
                name="name"
                required="required"
                value={input.name}
                onChange={handleChange}
              />
              {errors.name && <p className={style.danger}>{errors.name}</p>}
            </div>
            <div>
              <input
                className={errors.heightmin && style.danger}
                placeholder="Min Heigth"
                type="number"
                name="heightmin"
                required="required"
                value={input.heightmin}
                onChange={handleChange}
              />
              {errors.heightmin && (
                <p className={style.danger}>{errors.heightmin}</p>
              )}
            </div>
            <div>
              <input
                className={errors.heightmax && style.danger}
                placeholder="Max Heigth"
                type="number"
                name="heightmax"
                required="required"
                value={input.heightmax}
                onChange={handleChange}
              />
              {errors.heightmax && (
                <p className={style.danger}>{errors.heightmax}</p>
              )}
            </div>
            <div>
              <input
                className={errors.weightmin && style.danger}
                placeholder="Min Weigth"
                type="number"
                name="weightmin"
                required="required"
                value={input.weightmin}
                onChange={handleChange}
              />
              {errors.weightmin && (
                <p className={style.danger}>{errors.weightmin}</p>
              )}
            </div>
            <div>
              <input
                className={errors.weightmax && style.danger}
                placeholder="Max Weigth"
                type="number"
                name="weightmax"
                required="required"
                value={input.weightmax}
                onChange={handleChange}
              />
              {errors.weightmax && (
                <p className={style.danger}>{errors.weightmax}</p>
              )}
            </div>
            <div>
              <input
                className={errors.yearsmin && style.danger}
                placeholder="Min years"
                type="number"
                name="yearsmin"
                required="required"
                value={input.yearsmin}
                onChange={handleChange}
              />
              {errors.yearsmin && (
                <p className={style.danger}>{errors.yearsmin}</p>
              )}
            </div>
            <div>
              <input
                className={errors.yearsmax && style.danger}
                placeholder="Max years"
                type="number"
                name="yearsmax"
                required="required"
                value={input.yearsmax}
                onChange={handleChange}
              />
              {errors.yearsmax && (
                <p className={style.danger}>{errors.yearsmax}</p>
              )}
            </div>
            <div>
              <select
                className={style.dere}
                name="temper"
                value={input.temper}
                onChange={handleChangeSelect}
                id="selectempe"
                /* required */
              >
                <option key="0" value="0">
                  Select{" "}
                </option>
                {props.temperament &&
                  props.temperament.map((elem) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div align="center">
            <textarea id="areatempe" readOnly rows="6" cols="35" />
          </div>
          <div>
            <button className={style.addbut} type="submit" >Create Breed</button>
          </div>
        </form>
      </div>
      <button
        className={style.centerbut}
        onClick={() => {
          goBack();
        }}
      >
        Go Back 👈
      </button>
    </>
  );
}

function mapStateToProps(state) {
  return {
    namesRaza: state.auxBreeds,
    temperament: state.temperament,
  };
}

// Elimino la funcion de obtener temperamentos ya que vienen cargados en el state
/* function mapDispatchToProps(dispatch) {
  return {
    getTemperaments: (elem) => dispatch(getTemperaments(elem)),
  };
} */

export default connect(mapStateToProps, null)(AddBreed);
