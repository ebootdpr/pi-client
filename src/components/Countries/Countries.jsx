import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/actions";
import Country from "../Country/Country";
import stylo from "./Countries.module.css";

export default function Countries() {
  const dispatch = useDispatch();
  const background = useSelector((state) => state.background);
  const countries = useSelector((state) => state.countries); //para la primera descargada de la DB
  const showableCountries = useSelector((state) => state.showableCountries);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
      if(countries.length===0) dispatch(fetchCountries()) //primera descargada
  }, []);
  let display = <div>No se ha fetcheado nada ...</div>;
  if (countries.length) {
    display = (
      <div className={stylo.container}>
        {showableCountries?.map((item, index) => {
          return (
            <Country
            gridpos= {index}
              key={item.cca3}
              cca3={item.cca3}
              name={item.name}
              flags={item.flags}
              continents={item.continents}
            />
          );
        })}
      </div>
    );
  } else {
    display = <div>No se encontraro paises a mostrar.</div>;
  }

  return (
    <div>
      <div
        className={stylo.bg}
        style={{
          backgroundImage: `url(/img/${background}.png) ,url(/img/background.png)`,
        }}
      >{loading ? <div>Cargando...</div> : display}</div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   countries: state.countries,
//   loading: state.loading,
// });

// export default connect(mapStateToProps, null)(Countries);
