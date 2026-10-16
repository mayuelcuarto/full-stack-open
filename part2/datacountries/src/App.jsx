import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  const hook = () => {
    countryService
      .getAll()
      .then(initialPersons => {
        setCountries(initialPersons)
      })
  }
    
  useEffect(hook, [])

  if (!countries) { 
    return null 
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <p>find countries <input value={filter} onChange={handleFilterChange} /></p>
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
