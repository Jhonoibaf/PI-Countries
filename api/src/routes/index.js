const { Router } = require('express');
const  axios  =  require ( 'axios' );
const {Country , Activity} = require ('../db')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

const getActivities = async () => {
  const dbActivities= await Activity.findAll(
  {include:{
    model: Country,
    atributes: ['name'],
    through:{
        atributes: [],
    }
  }}
  )
  return dbActivities
}

router.get('/countries', async (req, res ) => {
  try {
    if(req.query.name){
      const {name} = req.query
      const countries = await getCountries()
      let country = countries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
      
      if (!country) res.status(400).send('Country dont exist')
        res.status(200).send(country)
    }else if(req.query.continents){
      const {continents} = req.query
      const countries = await getCountries();
      let country = countries.filter(el => el.continents.toLowerCase().includes(continents.toLowerCase()))
      
      if (!country) res.status(400).send('Continent dont exist')
        res.status(200).send(country)
    }else{
    const allCountries = await getCountries();
    res.send(allCountries)
  }
} catch{
    res.status(400).send('No se encontraron los paises')
  }
})

router.get('/countries/:id', async(req, res) => {
  try{
    const { id } = req.params
    const countries = await getCountries()

    if(!countries) res.status(400).send('cant get countries information to ID reques')

    const country = countries.find( el => el.id === id.toString())

    if(!country) res.status(400).send('Country dont exist')
      res.status(200).send(country)

  }catch(error){
    res.status(400).send(error.message)
  }
})


router.post('/activities', async (req, res) => {
  try {  
    const {name, difficulty, time, season, countries} = req.body;
    const currentActivity = await Activity.create({
      name,
      difficulty,
      time,
      season
    });
    
    for(const country of countries){
      console.log(country)
      let countryDB = await Country.findAll({
      where : {name:{[Op.like]:`%${country}%`}}
      });
      currentActivity.addCountry(countryDB)
    }
    res.send('Activity has created')
  } catch(error){
    console.error(error.message)
    res.status(400).send('no se pudo crear la actividad')
  }
});

router.get('/activities', async(req, res) => {
  try{
    const activities = await getActivities();
    if(!activities) res.status(400).send('there aren´t activities')
      res.status(200).send(activities)
  }catch(error){
    res.status(400).send(error.message)
  }
});



module.exports = router;
