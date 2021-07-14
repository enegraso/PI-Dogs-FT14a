import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBreedsAll,
  getBreed,
  getTemperaments,
  sort,
  filtroTemp,
} from "../actions";

function Breeds(props) {
  return (
    <>
      <h1>Listado de Razas</h1>
    </>
  );
}

function mapStateToProps(state) {
  return {
    estado: state.razas,
    estadoT: state.temperamento,
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

export default connect(mapStateToProps, mapStateToProps)(Breeds);
