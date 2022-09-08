const { Router } = require('express');
const  axios  =  require ( 'axios' );
const {Country , Activity} = require ('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInf = async()=> {
  const api = await axios.get('https://restcountries.com/v3/all')
  const apiData = api.data.map(el => {
    return{
      id : el.cca3,
      name: el.name.official,
      image: el.flags[1],
      continents: el.continents[0],
      capital: el.capital? el.capital[0]:'Sin información',
      subregion: el.subregion? el.subregion: 'Sin información',
      area: el.area,
      population: el.population
    }
  })
  return apiData
}



const getCountries = async () => {
  const dbCountriesInf = await Country.findAll(
    {include:{
      model: Activity,
      atributes: ['activity'],
      through:{
          atributes: [],
      }
    }}
  )
  
  console.log(dbCountriesInf)
  if (dbCountriesInf && dbCountriesInf.length > 0) return dbCountriesInf

  const countries = await getApiInf();
  console.log(countries)
  for (el of countries){
    if (!el) continue
    await Country.findOrCreate({
      where: {
          id: el.id,
          name: el.name,
          image: el.image,
          continents: el.continents,
          capital: el.capital,
          subregion: el.subregion,
          area: el.area,
          population: el.population
      }
    })
  }
  return countries
}

router.get('/countries', async (req, res) => {
  const allCountries = await getCountries();
  res.send(allCountries)
})







module.exports = router;
