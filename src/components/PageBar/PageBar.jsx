import React, { useEffect } from "react";
import { connect } from "react-redux";
// import {  } from "../../redux/actions";
// import { useDispatch } from "react-redux";
import stl from "./PageBar.module.css";
import PropTypes from "prop-types";

PageVar.propTypes = {
  countries: PropTypes.array.isRequired,
  currentPage: PropTypes.string.isRequired
};
/**
 * Hace dispatch con filtros hacia la API
 * Recive la cantidad de resultados countries.length
 * @param {*} param0
 * @returns
 */
function PageVar({ currentPage, countries }) {
  // const dispatch = useDispatch();
  const handleClick = (num) => {
    if (num < 1) num = 1;
    num = num + ""; //porque javascript es asi.
  };

  useEffect(() => {
    // dispatch();
  }, []);

  const page = parseInt(currentPage);
  return (
    <div className={stl.barritapaginas}>
      <p className={stl.textoencontrados}>
        Resultados Encontrados: {countries.length}
      </p>
      <button disabled={page < 2} onClick={() => handleClick(`${page - 1}`)}>
        {"<"}
      </button>
      <button onClick={() => handleClick(`${page - 2}`)}>{`${
        page - 2
      }`}</button>
      <button onClick={() => handleClick(`${page - 1}`)}>{`${
        page - 1
      }`}</button>
      <button
        disabled={true}
        onClick={() => handleClick(`${page}`)}
      >{`${page}`}</button>
      <button onClick={() => handleClick(`${page + 1}`)}>{`${
        page + 1
      }`}</button>
      <button onClick={() => handleClick(`${page + 2}`)}>{`${
        page + 2
      }`}</button>
      <button onClick={() => handleClick(`${1 + page}`)}>{">"}</button>
    </div>
  );
}
const mapSateToProps = (state) => {
  return {
    countries: state.countries,
    currentPage: state.currentPage,
  };
};

export default connect(mapSateToProps, null)(PageVar);
