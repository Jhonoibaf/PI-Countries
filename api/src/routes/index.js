const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Servicio: solicitud de información de paises de API 
const getApiInf = async () => {
  const api = await axios.get('https://restcountries.com/v3/all')
  const apiData = api.data.map(country => {
    return {
      id: country.cca3,
      name: country.name.official,
      image: country.flags[1],
      continents: country.continents[0],
      capital: country.capital ? country.capital[0] : 'Sin información',
      subregion: country.subregion ? country.subregion : 'Sin información',
      area: country.area,
      population: country.population
    }
  })
  return apiData
}

// servicio: paso de la información de la API a DB --> return countries DB:

const getCountries = async () => {
  const dbCountriesInf = await Country.findAll(
    {
      include: {
        model: Activity,
        atributes: ['name'],
        through: {
          atributes: [],
        }
      }
    }
  )

  if (dbCountriesInf && dbCountriesInf.length > 0) return dbCountriesInf

  const countries = await getApiInf();
  for (const country of countries) {
    if (!country) continue
    await Country.findOrCreate({
      where: {
        id: country.id,
        name: country.name,
        image: country.image,
        continents: country.continents,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population
      }
    })
  }
  return countries
}

//servicio: Petición de Actividades a la DB:

const getActivities = async () => {
  const dbActivities = await Activity.findAll(
    {
      include: {
        model: Country,
        atributes: ['name'],
        through: {
          atributes: [],
        }
      }
    }
  )
  return dbActivities
}


// rutas API: petición de paises query y all countries

router.get('/countries', async (req, res) => {
  try {
    if (req.query.name) {
      const { name } = req.query
      const countries = await getCountries()
      let country = countries.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

      if (!country) res.status(400).send('Country dont exist')
      res.status(200).send(country)
    } else {
      const allCountries = await getCountries();
      res.send(allCountries)
    }
  } catch {
    res.status(400).send('No se encontraron los paises')
  }
})

// rutas API: petición de paises params

router.get('/countries/:id', async (req, res) => {
  try {
    const { id } = req.params
    const countries = await getCountries()

    if (!countries) res.status(400).send('cant get countries information to ID reques')

    const country = countries.find(el => el.id === id.toString())

    if (!country) res.status(400).send('Country dont exist')
    res.status(200).send(country)

  } catch (error) {
    res.status(400).send(error.message)
  }
})

// rutas API: Creación de actividades

router.post('/activities', async (req, res) => {
  try {
    const { name, difficulty, time, season, temporada, countries } = req.body;

    if (!name || !difficulty || !time || !season ||!temporada || !countries) {
      res.status(400).send('Falta información para crear actividad')
      return
    }

    const currentActivity = await Activity.create({
      name,
      difficulty,
      time,
      season,
      temporada
    });

    for (const country of countries) {
      let countryDB = await Country.findAll({
        where: { name: { [Op.like]: `%${country}%` } }
      });
      currentActivity.addCountry(countryDB)
    }
    res.send('Activity has created')
  } catch (error) {
    console.error(error.message)
    res.status(400).send('no se pudo crear la actividad')
  }
});

// rutas API: Obtener actividades para filtro:

router.get('/activities', async (req, res) => {
  try {
    const activities = await getActivities();
    if (!activities) res.status(400).send('there aren´t activities')
    res.status(200).send(activities)
  } catch (error) {
    res.status(400).send(error.message)
  }
});





module.exports = router;
