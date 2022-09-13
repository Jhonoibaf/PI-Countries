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
      atributes: ['name'],
      through:{
          atributes: [],
      }
    }}
  )
  
  if (dbCountriesInf && dbCountriesInf.length > 0) return dbCountriesInf

  const countries = await getApiInf();
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


router.get('/countries', async (req, res, next) => {
  if(req.query.name){
    next()
  }
  const allCountries = await getCountries();
  res.send(allCountries)
})

router.get('/countries/:id', async(req, res) => {
  const { id } = req.params
  const countries = await getCountries()
  const country = countries.find( el => el.id === id.toString())
  if(country){
    res.status(200).send(country)
  } else {
    res.status(400).send('Country dont exist')
  }
})

router.get('/countries', async(req, res) => {
  const {name} = req.query
  console.log(name);
  const countries = await getCountries()
  console.log('estos son todos los paises ' + countries);
  let country = countries.find( el => el.name.toLowerCase().includes(name.toLowerCase()))
  console.log(country);
  if (country){
    res.status(200).send(country.dataValues)
  }  else {
    res.status(400).send('Country dont exist')
  }
})

router.post('/activities', async(req, res) => {
  const {activity, difficulty, time, season, countries} = req.body;
  const currentActivity = await Activity.create({
    name: activity,
    difficulty: difficulty,
    time: time,
    season: season
  });
  
  for(country of countries){
    const countryDB = Country.findAll({
      where : {name:country}
    });
    currentActivity.addCountry(countryDB)
  }
  res.send('Activity has created')
});









module.exports = router;
