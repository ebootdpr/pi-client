import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSearchterms, fetchCountriesFiltered, setQuerys } from "../../redux/actions";
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props) {
        super(props);
        this.emptySearchTerms = {
            cca3: "",
            name: "",
            flags: "",
            continents: "",
            capital: "",
            subregion: "",
            area: "",
            population: "",
            act_name: "",
            act_season: "",
            act_duration: "",
            act_difficulty: "",
        };
        this.state = {
            localSearchTerms: {
                cca3: "",
                name: "",
                flags: "",
                continents: "",
                capital: "",
                subregion: "",
                area: "",
                population: "",
                act_name: "",
                act_season: "",
                act_duration: "",
                act_difficulty: "",
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleReset = () => {

        this.setState({ ...this.state, localSearchTerms: this.emptySearchTerms})
        this.props.changeSearchterms()
        this.props.setQuerys("")
        this.props.fetchCountriesFiltered("")
    }
    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.changeSearchterms({
            ...this.state.localSearchTerms
        })
        const array = Object.keys(this.state.localSearchTerms).map(key => {
            if (this.state.localSearchTerms[key] !== "") { //searchTerm no vacío? 
                return `${key}=${this.state.localSearchTerms[key]}`
            }
        });

        const querys = '?' + array.filter(n => n).join('&&')
        this.props.setQuerys(querys)
        this.props.fetchCountriesFiltered(querys)
    }
    handleChange = (ev) => {
        this.setState({ ...this.state, localSearchTerms: { ...this.state.localSearchTerms, [ev.target.name]: ev.target.value } })
    }
    componentDidMount() {
        console.log('THIS IS MOUNTED NOW')
        this.setState({ ...this.props, localSearchTerms: { ...this.props.SearchTerms } })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p >FIltros de Paises:</p>
                {(
                    Object.keys(this.state.localSearchTerms).map(attr => {

                        if (attr.slice(0, 4) !== 'act_') {
                            return <input name={attr} value={this.state.localSearchTerms[attr]} placeholder={attr} key={attr} onChange={this.handleChange}></input>
                        }
                    })
                )}
                <p >Filtros de Actividades:</p>
                {(
                    Object.keys(this.state.localSearchTerms).map(attr => {
                        if (attr.slice(0, 4) === 'act_')
                            return <input name={attr} value={this.state.localSearchTerms[attr]} placeholder={attr.slice(4)} key={attr} onChange={this.handleChange}></input>
                    })
                )}
                <button type="submit">APLICAR FILTROS</button>
                <button onClick={this.handleReset}>LIMPIAR</button>
            </form>
        );
    }
}
Search.propTypes = {
    SearchTerms: PropTypes.object,
    changeSearchterms: PropTypes.func,
    fetchCountriesFiltered: PropTypes.func,
    setQuerys: PropTypes.func,
}
const mapStateToProps = (state) => {
    return { SearchTerms: state.SearchTerms };
};
const mapDispatchToProps = (dispatch) => {
    //increment: ()=>{dispatch(increment())
    return {
        changeSearchterms: (obj) => { dispatch(changeSearchterms(obj)) },
        fetchCountriesFiltered: (query) => { dispatch(fetchCountriesFiltered(query)) },
        setQuerys: (querys) => { dispatch(setQuerys(querys)) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
