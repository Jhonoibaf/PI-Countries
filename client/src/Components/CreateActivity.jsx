import React from "react";


import { postActivities, getCountries} from '../Actions';
import {useDispatch, useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { Link, useHistory  } from "react-router-dom";

function validate(input){
  let errors = {}
  if(!input.name){
      errors.name = 'Name is Require '
  }else if (!input.difficulty){
      errors.difficulty = 'Dificulty is Require'
  }else if (!input.time){
      errors.time = 'Time is Require'
  }else if (!input.season){
      errors.season = 'Season is Require'
  }
  else if(input.countries.length<1){
      errors.countries='selctec almost one Country'
  }
  return errors
}

export default function CreateActivity(){
  const dispatch = useDispatch()
  const history = useHistory()
  const countries = useSelector((state)=>state.countries)
  const [input, setInput]= useState({
      name:"", 
      difficulty:"", 
      time:"", 
      season:"",
      countries:[]
  })

  const [errors, setErrors]= useState({})

  useEffect(()=>{
      dispatch(getCountries())
  }, []);

  function hadleChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function hadleSelect(e){
    setInput({
      ...input,
      countries:[...input.countries,e.target.value]
    })
  }

  function handleSubmmit(e){
    e.preventDefault();
    dispatch(postActivities(input))
    alert('Created activity!!')
    setInput({
      name:"", 
      difficulty:"", 
      time:"", 
      season:"",
      countries:[]
    })
    history.push('/home')
  }
  function handleDelete(el){
    setInput({
      ...input,
      countries: input.countries.filter(country => country !== el)
    })
  }


  return(
    <div>
      <Link to='/home'><button>Back Home</button></Link>
      <div>
        <h1>Create new activity</h1>
        <form >
          <label></label>
            
        </form>
        {
          input.countries.map(el=>
            <div>
              <p>{el}</p>
              <button onClick={()=>handleDelete(el)}>X</button>
            </div>
          )
        }
      </div>
    </div>
  )


}

