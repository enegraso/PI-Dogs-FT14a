import style from "../styles/Detail.module.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBreedDetails, cleardetail } from "../actions/index";

function Detail(props) {

  function goBack() {
    props.cleardetail()
    window.history.go(-1);
  } 

  useEffect(() => {
    const breedId = props.match.params.id;
    props.getBreedDetails(breedId);
  }, []);

  if (!props.razaDetail.name) {
    return <img className={style.imgloader} src="https://i.gifer.com/ZZ5H.gif" alt="loader" />;
  }

  return (
    <>
    {console.log(props.razaDetail.name)}
      <div className={style.wc}>

       <button className={style.centerbut}
        onClick={() => {
          goBack();
        }}
      >
        Go Back 👈
      </button> 
        <div className={style.container}>
          <div className={style.card_container}>
            <div className={style.header}>
              <img
                src={props.razaDetail.img}
                className={style.imagen}
                width="400"
                height="300"
                alt="img breed"
              />
              <h2>{props.razaDetail.name}</h2>
              <h4 className={style.text_white}>
                {props.razaDetail.temperament}
              </h4>
            </div>
            <div className={style.description}>
              <p className={style.wc}>
                <strong>Breed's Detail</strong>
              </p>
              <p className={style.text_white}>
                Height: {props.razaDetail.height}
              </p>
              <p className={style.text_white}>
                Weight: {props.razaDetail.weight}
              </p>
              <p className={style.text_white}>
                Life Span: {props.razaDetail.life_span}
              </p>
            </div>
          </div>
        </div>
        <button className={style.centerbut}
        onClick={() => {
          goBack();
        }}
      >
        Go Back 👈
      </button>
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
    cleardetail: () => dispatch(cleardetail())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
