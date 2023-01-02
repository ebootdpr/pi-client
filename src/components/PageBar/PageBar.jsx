import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import stl from "./PageBar.module.css";
import { verFiltros, updateCurrentPage, updateShowableCountries } from "../../redux/actions";

export default function PageBar() {
  const dispatch = useDispatch();
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const currentPage = useSelector((state) => state.currentPage);
    const currentOrder = useSelector(state=>state.currentOrder)
  const [paisesDisponibles, setpaisesDisponibles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  //CLICK HANDLERS
  const handleClick = (newPage) => {
    handlePageChange(newPage)
  };
  
  const handleClickAdvancedSearch = () => {
    dispatch(verFiltros());
  };

//ON COMPONENT update filters
  useEffect(() => {
    dispatch(updateCurrentPage(1))
    dispatch(updateShowableCountries(filteredCountries.slice(0, 9)))
    setpaisesDisponibles(filteredCountries)
    setSearchTerm("")
}, [filteredCountries, currentOrder])


  /*
    *    maxPage  9 = 9/10 + 1 = 1 
    *    maxPage 10 = 11/10 + 1= 2
    *    maxPage 19 = 19/10 +1 = 2
    *    maxPage 20 = 21/10 +1 = 3
   */
  const maxPage = paisesDisponibles.length <= 9 ? 1 :  Math.ceil((paisesDisponibles.length+1)/10)
  2

  //funciona perfecto
    const handlePageChange = newPage => {
        //startIndex(2)= (2-1)*10-1= 9   endIndex=19
        //startIndex(3)= (3-1)*10-1= 19  endIndex=29
        //startIndex(4)= (4-1)*10-1= 29   endIndex=39
        let startIndex = (newPage - 1) * 10-1; //el ultimo -1 es por la primera pagina
        let endIndex = startIndex + 10;
        if (newPage < 2) { //primera pagina 9 elementos
            startIndex = 0;
            endIndex = 9;
        }
        const newShowableCountries = paisesDisponibles.slice(startIndex, endIndex);
        dispatch(updateCurrentPage(newPage))
        dispatch(updateShowableCountries(newShowableCountries))
    }
    let paginas = []
    //PRIMERA PAGINA
    if(currentPage-3>0)
      paginas.push(<button key={'first page'} className={stl.firstpage} onClick={() => handleClick(1)}>{`1`}</button>);
    else
      paginas.push(<button key={'first page'} className={stl.firstpage} style={{visibility: "hidden"}} onClick={() => handleClick(1)}>{`1`}</button>);
    if(currentPage-2>0)
      paginas.push(<button key={'2- page'} className={stl.normalpage}  onClick={() => handleClick(currentPage - 2)}>{`${currentPage - 2}`}</button>);
    else
      paginas.push(<button key={'2- page'} className={stl.normalpage} style={{visibility: "hidden"}} onClick={() => handleClick(currentPage - 2)}>{`${currentPage - 2}`}</button>);
    if(currentPage-1>0)
      paginas.push(<button key={'1- page'} className={stl.normalpage}  onClick={() => handleClick(currentPage - 1)}>{`${currentPage - 1}`}</button>);
    else
      paginas.push(<button key={'1- page'} className={stl.normalpage} style={{visibility: "hidden"}} onClick={() => handleClick(currentPage - 1)}>{`${currentPage - 1}`}</button>);
//PAGINA ACTUAL
    paginas.push(<button key={'current page'} className={stl.currentpage}  disabled={true} onClick={() => handleClick(currentPage)}>{`${currentPage}`}</button>);
    if(currentPage+1<=maxPage)
      paginas.push(<button key={'1+ page'} className={stl.normalpage}  onClick={() => handleClick(currentPage + 1)}>{`${currentPage + 1}`}</button>);
    else
      paginas.push(<button key={'1+ page'} className={stl.normalpage} style={{visibility: "hidden"}} onClick={() => handleClick(currentPage + 1)}>{`${currentPage + 1}`}</button>);
    if(currentPage+2<=maxPage)
      paginas.push(<button key={'2+ page'} className={stl.normalpage}  onClick={() => handleClick(currentPage + 2)}>{`${currentPage + 2}`}</button>);
    else
      paginas.push(<button key={'2+ page'} className={stl.normalpage} style={{visibility: "hidden"}} onClick={() => handleClick(currentPage + 2)}>{`${currentPage + 2}`}</button>);
//ULTIMA PAGINA
    if(currentPage+3<=maxPage)
      paginas.push(<button key={'last page'} className={stl.lastpage}  onClick={() => handleClick(maxPage)}>{`${maxPage}`}</button>);
      else
      paginas.push(<button key={'last page'} className={stl.lastpage} style={{visibility: "hidden"}} onClick={() => handleClick(maxPage)}>{`${maxPage}`}</button>);


 //#region busqueda por nombre, 
 //Toma de filteredCountries onChanged: DONE
 //RESETs on filteredCountries changed, array:DONE searchterm: DONE

 useEffect(() => {
        //buscador funciona
        setpaisesDisponibles(filteredCountries.filter(pais => {
            return (pais.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }))
}, [searchTerm])

useEffect(() => {
        const newShowableCountries = paisesDisponibles.slice(0, 9);
        dispatch(updateCurrentPage(1))
        dispatch(updateShowableCountries(newShowableCountries))
          
  }, [paisesDisponibles])   

    function handleChange(e) {
        setSearchTerm(e.target.value)
    }
       
//#endregion     
    
    


  return (
    <div className={stl.barritapaginas}>
      {paginas}
      <p className={stl.textoencontrados}>  {filteredCountries.length} resultados   </p>
      <input style={BuscarObj} placeholder='Buscar por nombre' value={searchTerm} onChange={handleChange} name="busca" type="text" />
      <button style={filtrarObj} onClick={handleClickAdvancedSearch}></button>
    </div>
  );
}
const filtrarObj = {
  height: "48px",
  maxWidth: "none",
  minWidth: "none",
  width: "50px",
  background: "url(/img/filtrar.png)",
  backgroundSize: "cover"
}
const BuscarObj = {
  height: "44px",
  maxWidth: "none",
  minWidth: "none",
  width: "150px",
}
