import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOADING_FAILED } from "../../redux/actions";
import stylo from "./Loading.module.css";

function Loading() {
  const dispatch = useDispatch();
  useEffect(() => {
    const IDparaelMemoryLeak = setTimeout(() => {
      alert(
        "Pasaron 30 segundos desde que se realizó la petición, puede que el servidor esté caído"
      );
      dispatch({ type: LOADING_FAILED });
    }, 20000);

    return () => {
      clearTimeout(IDparaelMemoryLeak);
    };
  }, []);

  return (
    <div
      className={stylo.LoadingContainer}>
        <video className={stylo.background} autoPlay loop muted>
             <source src="/LandingBackground.mp4" type="video/mp4" />
        </video>
        <h1> Cargando...</h1>
  
  
    </div>
  );
}

export default Loading;
