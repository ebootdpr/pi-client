import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideError } from "../../redux/actions";
import stylo from "./Error.module.css";
export default function Error() {
  const errorMessage = useSelector((state) => state.errorMessage);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(hideError());
  }
  
  return (
    <div
      className={stylo.errorcontainer}
    >
      <h1 className={stylo.h1error}>Error</h1>
      <p className={stylo.errorMessage}>{errorMessage}</p>
      <button className={stylo.closeError} onClick={handleClick}>
        Cerrar
      </button>
    </div>
  );
}
