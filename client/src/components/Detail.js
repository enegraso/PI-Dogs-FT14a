import style from "../styles/Detail.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBreedDetails } from "../actions/index";

function goBack() {
  window.history.go(-1);
}

function Detail(props) {
    
  useEffect(() => {
    const breedId = props.match.params.id;
    props.getBreedDetails(breedId);
  },[]);

  return (
    <>
      <button onClick={() => {goBack()}}>Volver</button>
      <div className={style.wc}>
        <div className={style.container}>
          <div className={style.card_container}>
            <div className={style.header}>
              <img
                src={props.razaDetail.img}
                className={style.imagen}
                width="400"
                height="300"
              />
              <h2>{props.razaDetail.name}</h2>
              <h4 className={style.text_white}>{props.razaDetail.temperament}</h4>
            </div>
            <div className={style.description}>
              <p className={style.wc}>
                <strong>Breed's Detail</strong>
              </p>

              <p className={style.text_white}>Height: {props.razaDetail.height}</p>
              <p className={style.text_white}>Weight: {props.razaDetail.weight}</p>

              <p className={style.text_white}>
                Life Span: {props.razaDetail.life_span}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    razaDetail: state.breedDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreedDetails: (id) => dispatch(getBreedDetails(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
