import axios from 'axios';

export default function getCountries(){
  return async function (dispatch) {
    try{
      const info = axios.get('http://localhost:3001/countries')
      return dispatch ({
        type: 'GET_COUNTRIES',
        payload: info.data
    })
    }catch(error){
      console.error(error.message)
    }
  }
}
