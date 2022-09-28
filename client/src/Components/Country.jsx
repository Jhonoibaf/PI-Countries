/* eslint-disable jsx-a11y/alt-text */
import React  from 'react';
import './Country.css'

export default function Country({name, image, continents}){
  return (
    <div className='country'>
      <h3 className='name'>{name}</h3>
      <img src={image} className='image'/>
      <h4>{continents}</h4>
    </div>
  )
}