import axios from 'axios';

export  function getCountries(){
  return async function (dispatch) {
    try{
      const info = await axios.get('/countries')
      return dispatch ({
        type: 'GET_COUNTRIES',
        payload: info.data
    })
    }catch(error){
      console.error(error.message)
    }
  }
}

export  function getActivities(){
  return async function (dispatch) {
    try{
      const info = await axios.get('/activities')
      return dispatch ({
        type: 'GET_ACTIVITIES',
        payload: info.data
    })
    }catch(error){
      console.error(error.message)
    }
  }
}

export function filterActivities(payload){
  try {
    return(
      {
        type: 'FILTER_BY_ACTIVITY',
        payload
      }
    )
  } catch (error) {
    console.error(error.message)
  }
}

export function filterContinents(payload){
  try {
    return(
      {
        type: 'FILTER_BY_CONTINENTS',
        payload
      }
    )
  } catch (error) {
    console.error(error.message)
  }
}

export function orderByName (payload){
  return{
      type:'ORDER_BY_NAME',
      payload
  }
}

export function orderByPopulation (payload){
  return{
      type:'ORDER_BY_POPULATION',
      payload
  }
}

export function getNameInfo(name){
  return async function(dispatch){
      try{
          var info = await axios.get('/countries?name='+ name)
          return dispatch(
              {
                  type: 'GET_NAME_INFO',
                  payload: info.data
              }
          )
      } catch(error){
      console.error(error);
      }
  }
}

export function postActivity(payload){
  return async function(dispatch){
      try{
          var info = await axios.post('/activities', payload)
          return dispatch({
              type: 'POST_ACTIVITY',
              info    
          })
      } catch(error){
      console.error(error);
      }
  }
}

export function detailCountry(id){
  return async function(dispatch){
      try{
          var info = await axios.get(`/countries/${id}`)
          console.log(info.data);
          return dispatch(
              {
                  type: 'GET_DETAIL_INFO',
                  payload: info.data
              }
          )
      } catch(error){
      console.error(error);
      }
  }
}


