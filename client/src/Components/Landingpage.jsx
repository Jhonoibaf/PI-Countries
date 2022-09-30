import React from "react";
import ButtonHome from './ButtonHome'
import './Landingpage.css'

export default function Landingpage() {
  return (
    <div className="background">
      <div className="title">
        <h1 className="text">Welcom to countries page</h1>
        <ButtonHome />
      </div>
    </div>
  )
}