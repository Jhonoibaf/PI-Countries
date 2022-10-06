
const initialState = {
  countries: [],
  filteredCountries: [],
  activities: [],
  detail: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload
      };
    case 'GET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
      }
    case 'FILTER_BY_ACTIVITY':
      const allActivities = state.activities
      const selectedActivity = allActivities.find((activity) => activity.name === action.payload)
      if (!selectedActivity) {
        return {
          ...state,
          filteredCountries: state.countries
        }
      }

      /* const selectedCountries = state.filteredCountries.filter(country => {
        return selectedActivity.Countries.find(activityCountry => country.name === activityCountry.name)
      })
      console.log({ selectedCountries, filteredCountries: state.filteredCountries }); */
      return {
        ...state,
        filteredCountries: selectedActivity.Countries
      }
    case 'FILTER_BY_CONTINENTS':
      const allCountries = state.countries
      const selectedContients = allCountries.filter((country) => country.continents === action.payload)
      if (!selectedContients || action.payload === 'All') {
        return {
          ...state,
          filteredCountries: state.countries
        }
      }
      return {
        ...state,
        filteredCountries: selectedContients
      }

    case 'ORDER_BY_NAME':
      const sortedNameCountries = action.payload === 'asc' ?
        state.filteredCountries.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1
          return 0;
        }) :
        state.filteredCountries.sort(function (a, b) {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        })
      return {
        ...state,
        filteredCountries: sortedNameCountries
      }
    case 'ORDER_BY_POPULATION':
      const sortedByPopulation = action.payload === 'smallest' ?
        state.filteredCountries.sort(function (a, b) {
          if (a.population > b.population) return 1;
          if (a.population < b.population) return -1
          return 0;
        }) :
        state.filteredCountries.sort(function (a, b) {
          if (a.population > b.population) return -1;
          if (a.population < b.population) return 1;
          return 0;
        })
      return {
        ...state,
        filteredCountries: sortedByPopulation
      }

    case 'GET_NAME_INFO':
      return {
        ...state,
        filteredCountries: action.payload
      }
    case 'POST_ACTIVITY':
      return {
        ...state,
      }

    case 'GET_DETAIL_INFO':
      return {
        ...state,
        detail: action.payload,
      }
    default:
      return state;
  }
}