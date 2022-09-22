import React  from 'react';

function Country({name, image, continents}){
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt=" "/>
      <h4>{continents}</h4>
    </div>
  )
}