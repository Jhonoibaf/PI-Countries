import React from "react";


import { postActivity, getCountries } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";

function validate(input) {
  let errors = {}

  if (!input.name || input.name.length === 0) errors.name = 'Name is Require '
  if (!input.season || input.season.length === 0) errors.season = 'Season is Require'
  if (input.countries.length < 1) errors.countries = 'selctec almost one Country'
  return errors
}

export default function CreateActivity() {

  const allCountries = useSelector((state) => state.filteredCountries)
  const dispatch = useDispatch()
  const history = useHistory()
  const countries = useSelector((state) => state.countries)
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    time: "",
    typeOfTime: "",
    season: "",
    countries: []
  })

  const [errors, setErrors] = useState({})

  if (!allCountries || allCountries.length === 0) {
    dispatch(getCountries())
  }


  function hadleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function hadleSelectCountry(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value]
    })
  }

  function handleSubmmit(e) {
    e.preventDefault();
    const currentErrors = validate(input)
    setErrors(currentErrors)

    if (Object.keys(errors).length > 0 || Object.keys(currentErrors).length > 0) {
      alert('Verifique que todos los campos esten diligenciados')
      return
    }
    const timeAndUnit = input.time + ' ' + input.typeOfTime
    dispatch(postActivity({
      name: input.name,
      difficulty: input.difficulty,
      time: timeAndUnit,
      season: input.season,
      countries: input.countries
    }))
    alert('Created activity!!')
    setInput({
      name: "",
      difficulty: "",
      time: "",
      season: "",
      countries: []
    })
    history.push('/home')
  }

  return (
    <div>
      <Link to='/home'><button>Back Home</button></Link>
      <div>
        <h1>Create new activity</h1>
        <form onSubmit={(e) => handleSubmmit(e)}>
          <div>
            <label></label>
            <input
              placeholder="Activity name"
              type="text"
              size='60'
              maxLength='40'
              name='name'
              value={input.name}
              onChange={(e) => hadleChange(e)} />
            {
              errors.name && (
                <p>{errors.name}</p>
              )
            }
          </div>
          <div>
            <label>Dificulty</label>
            <select name="difficulty" onChange={(e) => hadleChange(e)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div>
            <input
              placeholder="Time"
              type="number"
              min='1'
              max='99'
              name='time'
              value={input.time}
              onChange={(e) => hadleChange(e)} />
            <select name='typeOfTime' onChange={(e) => hadleChange(e)}>
              <option defaultValue disabled>Select type of time</option>
              <option value='Hours'>Hours</option>
              <option value='Days'>Days</option>
            </select>
          </div>
          <div>
            <label>Season</label>
            <select name="season" onChange={(e) => hadleChange(e)}>
              <option defaultValue disabled >Selecciona una estación</option>
              <option value='Verano'>Verano</option>
              <option value='Otoño'>Otoño</option>
              <option value='Invierno'>Invierno</option>
              <option value='Primavera'>Primavera</option>
            </select>
          </div>
          <div>
            <select onChange={(e) => hadleSelectCountry(e)} >
              {
                countries.map((country) => (
                  <option value={country.name}>{country.name}</option>
                ))
              }
            </select>
          </div>
          <button type='submit' >Done</button>
        </form>

      </div>
    </div>
  )


}

