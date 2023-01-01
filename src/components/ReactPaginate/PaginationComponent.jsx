import ReactPaginate from "react-paginate";

import React  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateFilteredCountries } from "../../redux/actions";

export default function PaginationComponent() {
    const countries = useSelector(state => state.countries);
    const totalElements = countries.length
    const dispatch = useDispatch()

    const handlePageChange = page => {
        let startIndex = (page.selected - 1) * 10;
        if (page.selected === 0) {
            startIndex = 0;
        }
        const endIndex = startIndex + 9;
        const filteredCountries = countries.slice(startIndex, endIndex);
        dispatch(updateFilteredCountries(filteredCountries))
    }
    return (
       <ReactPaginate
        pageCount={totalElements/10}
        marginPageDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        /> 

    )
}
