import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import './detail.css'

export default function Detail(props) {

  const [country, setCountry] = useState(null)

  const { id } = useParams()

  function getDetail() {
    axios.get(`http://localhost:3001/countries/${id}`)
      .then((res) => {
        setCountry(res.data)
      })
      .catch()
  }

  useEffect(() => {
    if (country) return

    getDetail()
  })

  return country ? (
    <div>
      <div className='cardCountry'>
        <div>
          <h1>{country.name}</h1>
          <img className='imageDetail' src={country.image} alt='imgage not found' />
          <h3>Code: {country.id}</h3>
          <h3>Capital: {country.capital}</h3>
          <h3>Subregion: {country.subregion}</h3>
          <h3>Area: {country.area / 1000}km2</h3>
          <h3>Population: {country.population / 1000}</h3>
          <h3>Activity: {country.Activities.map(activity => activity.name)}</h3>
        </div>
        <Link to='/home'>
          <button className='homeButtonDetail'>Home</button>
        </Link>
      </div>
    </div>
  ) : <div> <span>Loading ...</span></div>

}