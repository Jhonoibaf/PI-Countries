import React from "react";
import {Link} from 'react-router-dom'
import {
  getCountries,
  getActivities,
  filterContinents,
  filterActivities,
  orderByName,
  orderByPopulation} from '../Actions';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Country from './Country'
import Paginado from "./Paginado";
import './Countries.css'
import SearchBar from "./ShearchBar";


export default function Home(){
  const dispatch = useDispatch()

  const allCountries = useSelector((state)=> state.filteredCountries)
  const allActivities = useSelector((state)=> state.activities)

  const [order , setOrder] = useState('')
  const [currentPage, setCurrentPage]= useState(1)
  const [countriesForPage,setCountriesForPage]= useState(10)
  const countOfLastCountries = currentPage * countriesForPage
  const countOfFirstCountries= countOfLastCountries - countriesForPage
  const currentCountries = allCountries.slice(countOfFirstCountries,countOfLastCountries)
  
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  useEffect(()=>{
   
    if (!allCountries || allCountries.length === 0) {
      dispatch(getCountries())
      dispatch(getActivities())
    }
  })

  function handleFilterContinents(continent) {
    console.log(continent.target.value);
    dispatch(filterContinents(continent.target.value))
  }

  function handleFilterActivities(activity) {
    dispatch(filterActivities(activity.target.value))
  }

  function handleSetOrderName(order) {
    order.preventDefault()
    dispatch(orderByName(order.target.value))
    setCurrentPage(1);
    setOrder(`order ${order.target.value}`)
  }

  function handleSetOrderPopulation(order) {
    order.preventDefault()
    dispatch(orderByPopulation(order.target.value))
    setCurrentPage(1);
    setOrder(`order ${order.target.value}`)
  }
  
  return (
    <div>
      <div>
        <div>Order by
          <div>Countries name
            <select onChange={e=> handleSetOrderName(e)} >
              <option value='asc'>A - Z</option> 
              <option value='des'>Z - A</option>
            </select>
          </div>
          <div>Countries population
            <select onChange={e=> handleSetOrderPopulation(e)}  >
              <option value='smallest'>smallest to largest</option> 
              <option value='largest'>largest to smallest</option> 
            </select>
          </div>
        </div>
        <div>Filter by
          <div>Continents
            <select onChange={e=> handleFilterContinents(e)}>
              <option value='All'>All Continents</option> 
              <option value='Africa'>Africa</option> 
              <option value='Asia'>Asia</option> 
              <option value='Europe'>Europe</option> 
              <option value='North America'>North America</option> 
              <option value='South America'>South America</option> 
              <option value='Oceania'>Oceania</option> 
            </select>
          </div>
          <div>Activities
            <select onChange={e => handleFilterActivities(e)}>
              <option value='null'>All Activities</option>
              { 
                allActivities.map((activity)=>(
                  <option value={activity.name}>{activity.name}</option>
                  ))
              }
            </select>
          </div>
        </div>
      </div>
      <SearchBar/>
      <Link to='/create'><button>Create new activity</button></Link>
      
      <div>
        <div className="cards-container">  
          {
            currentCountries?.map( (country) => 
            <Link to={'/home/' + country.id}>
              <Country 
                key={country.id}
                name = {country.name} 
                image= {country.image} 
                continents= {country.continents}
              />
            </Link>
            )
          }
        </div>
      </div>
       { <div>
          <Paginado
              countriesForPage = {countriesForPage}
              allCountries={allCountries.length}
              paginado = {paginado}
          />
        </div>}
    </div>
  )
}