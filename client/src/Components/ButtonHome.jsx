import React  from 'react';
import {Link} from 'react-router-dom'




function ButtonHome(){
  return (
   <Link to='/home'>
      <button>Go Home</button>
    </Link>
  )
}

export default ButtonHome