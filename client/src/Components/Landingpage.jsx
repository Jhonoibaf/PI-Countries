import React from "react";
import {Link} from 'react-router-dom'
import './Buttons.css'
import './Landingpage.css'

export default function Landingpage() {
  return (
    <div className="background">
      <div className="title">
        <h1 className="text">WELCOME TO</h1>
        <h1 className="text">COUNTRIES PAGE</h1>
        <Link to='/home'>
          <button className='buttonHomeLanding'>Go Home</button>
        </Link>
      </div>
    </div>
  )
}