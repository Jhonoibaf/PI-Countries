/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './Paginado.css';


export default function Paginado({ countriesForPage, allCountries, paginado }) {

  const totalPageNumbers = [];
  //const pageNumberRender = []

  for (let i = 0; i < Math.ceil(allCountries / countriesForPage); i++) {
    totalPageNumbers.push(i + 1)
  }

  

  return (
    <div className='Paginado'>
      <ul>
        {
          totalPageNumbers?.map(num => (
            <li key={num}>
              <a herf="#" onClick={() => paginado(num)}>{num}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}