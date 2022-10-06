import React from "react";
import { postActivity, getCountries, getActivities } from '../Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import './createActivity.css'
import './Buttons.css'


export default function CreateActivity() {


  const dispatch = useDispatch()
  const history = useHistory()
  const countries = useSelector((state) => state.countries)
  const activities = useSelector((state) => state.activities)
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    time: "",
    typeOfTime: "",
    season: "",
    temporada: "",
    countries: []
  })
  console.log(input);

  const [errors, setErrors] = useState({})

  if (!countries || countries.length === 0) {
    dispatch(getCountries())
  }

  if (!activities || activities.length === 0) {
    dispatch(getActivities())
  }

  function validate(currentInput) {
    let errors = {}

    if (!currentInput.name || currentInput.name.length === 0) errors.name = 'Name is Require '
    if (currentInput.name && currentInput.name.length > 0) {
      const repeatActivity = activities.find(activity => activity.name === currentInput.name)
      
      if (repeatActivity) errors.name = 'Activity name exist in data base, please change the name'
    }
    if (!currentInput.difficulty || currentInput.difficulty.length === 0) errors.difficulty = 'Select difficulty is Require '
    if (!currentInput.season || currentInput.season.length === 0) errors.season = 'Season is Require'
    if (!currentInput.time || currentInput.time.length === 0) errors.time = 'Time is Require'
    if (!currentInput.typeOfTime || currentInput.typeOfTime.length === 0) errors.typeOfTime = 'Select Hours or Days is Require'
    
   
    if (currentInput.countries.length === 0) errors.countries = 'select almost one Country'

    return errors
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

  function handleSelectCountry(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value]
    })
    
    setErrors(validate({
      ...input,
      countries: [...input.countries, e.target.value]
    }))
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter(country => country !== e.target.value)
    })
  }

  async function handleSubmmit(e) {
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
      temporada: input.temporada,
      countries: input.countries
    }))
    await dispatch(getActivities())
    alert('Created activity!!')
    setInput({
      name: "",
      difficulty: "",
      time: "",
      season: "",
      temporada: "",
      countries: []
    })
    history.push('/home')
  }

  return (
    <div className="backgroundForm">

      <div className="form">
        <Link to='/home' >
          <button className="buttonHomeForm">Back Home</button>
        </Link>
        <div>
          <h1>Create new activity</h1>
          <form onSubmit={(e) => handleSubmmit(e)}>
            <div className="options">
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
                  <div className="errors">{errors.name}</div>
                )
              }
            </div>
            <div className="options">
              <label>Dificulty  </label>
              <select name="difficulty" onChange={(e) => hadleChange(e)}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              {
                errors.difficulty && (
                  <div className="errors">{errors.difficulty}</div>
                )
              }
            </div>
            <div className="options">
              <input
                className="input"
                placeholder="Time"
                type="number"
                min='1'
                max='99'
                name='time'
                value={input.time}
                onChange={(e) => hadleChange(e)} />
              {
                errors.time && (
                  <div className="errors">{errors.time}</div>
                )
              }
              <select name='typeOfTime' onChange={(e) => hadleChange(e)}>
                <option selected disabled>Select type of time</option>
                <option value='Hours'>Hours</option>
                <option value='Days'>Days</option>
              </select>
              {
                errors.typeOfTime && (
                  <div className="errors">{errors.typeOfTime}</div>
                )
              }
            </div>

            <div className="options">
              <label>Temporada  </label>
              <select name="temporada" onChange={(e) => hadleChange(e)}>
                <option selected disabled >select temporada</option>
                <option value='Alta'>Alta</option>
                <option value='Media'>Media</option>
                <option value='Baja'>Baja</option>
              </select>
            </div>
            <div className="options">
              <label>Season  </label>
              <select name="season" onChange={(e) => hadleChange(e)}>
                <option selected disabled >select season</option>
                <option value='Verano'>Verano</option>
                <option value='Otoño'>Otoño</option>
                <option value='Invierno'>Invierno</option>
                <option value='Primavera'>Primavera</option>
              </select>
              {
                errors.season && (
                  <div className="errors">{errors.season}</div>
                )
              }
            </div>
            <div className="options">
              <select onChange={(e) => handleSelectCountry(e)} >
                {
                  countries.map((country) => (
                    <option value={country.name}>{country.name}</option>
                  ))
                }
              </select>
              {
                errors.countries && (
                  <div className="errors">{errors.countries}</div>
                )
              }
            </div>

            <div className="containerContrySelect">
              {input.countries.map(country =>
                <div>
                  <div className="selectedCountry">
                    <div>{country}</div>
                    <button value={country} className="deleteButton" onClick={(e) => handleDelete(e)}>X</button>
                  </div>
                </div>
              )}
            </div>

            <button type='submit' className="doneButton" >Done</button>
          </form>

        </div>
      </div>
    </div>
  )


}

