import React, { Component } from "react";
import { connect } from "react-redux";

/*
 ?DISEÑO
 // Va a entrar por props los terminos posibles q se pudan buscar, y si llevan prefix o no
 // El prefix o es vacio "" o es "act_"
 // Este componente solo recibe datos, los procesa y los envía, seria un compoente puro
 //Este compoente renderiza todas las posibilidades
 Este componente muestra todos los cuadors de busqueda posibles
 Va a enviar una dispatcheada de solo los props que no esten vacios
 Al hacer submit, va a almacenar en el estado global los terminos de busqueda
 Deberia de protegerse de entradas inalidas
 TODOS DEBEN SER STRINGS
 TODO: Diseño A)
  Todaas las del localstatey luego al hacer submit los pasa a int si es necesario
  al estado global le debe enviar undefined si esta vacio
  revisa el estado global al montarse, si es undefined, lo ignora

  ?PROPS
  Solo al montarse, toma el estado global q viene de props
  y actualiza las entradas para q se visualizen segun el diseño A)
 */
class Search extends Component {
  // eslint-disable-next-line no-unused-vars
  constructor(_props) {
    super();
    this.state = {
      modo: "Por Actividad",
      countriesSearchTerms: {
        cca3: "",
        name: "",
        flags: "",
        continents: "",
        capital: "",
        subregion: "",
        area: "",
        population: "",
      },
      activitiesSearchTerms: {
        act_name: "",
        act_season: "",
        act_duration: "",
        act_difficulty: "",
      },
     };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if(this.state.modo==="Por Actividad")
    this.setState({...this.state, modo: "Por País"});
    else
    this.setState({...this.state, modo: "Por Actividad"});
   Object.keys(this.state.countriesSearchTerms)
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>X</button>
        {this.state.modo ==="Por Actividad" ? (
          Object.keys(this.state.countriesSearchTerms).map(attr=>{
           return <input value={this.state.countriesSearchTerms[attr]} placeholder={attr} key={attr}></input>
          })
        ) : (
          <h1>{"Por País"}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { SearchTerms: state.SearchTerms };
};
const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  //increment: ()=>{dispatch(increment())
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
