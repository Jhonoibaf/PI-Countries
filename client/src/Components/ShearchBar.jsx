import React from 'react';
import {useState} from 'react';
import { useDispatch} from 'react-redux';
import {getNameInfo} from '../Actions';
import './Buttons.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handelInputName(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handelSubmit(e){
        e.preventDefault()
        dispatch(getNameInfo(name)) 
        setName('')       
    }

    return (
        <div>
            <input
                type = 'text'
                placeholder= 'Search...'
                onChange= {(e)=>handelInputName(e)}
                value={name}
            /> 
            <button className='searchbarButton' type='submit' onClick={(e=>handelSubmit(e))}>Search</button>           
        </div>
    )

}