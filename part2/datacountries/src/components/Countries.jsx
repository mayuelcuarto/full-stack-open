import Country from "./Country"

const Countries = ({countriesToShow}) => {
  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countriesToShow.length === 1){
    const country = countriesToShow[0]
    return <div>
              <h1>{country.name.common}</h1>
              <div>Capital {country.capital}</div>
              <div>Area {country.area}</div>
              <h3>Languages:</h3>
              <ul>
                {Object.values(country.languages).map(lang => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <img src={country.flags.png} />
          </div>
  }

  if (countriesToShow.length > 1 && countriesToShow.length < 10){
    return <ul>
            {countriesToShow.map((country) => (
              <Country key={country.cca3} country={country} />
            ))}
          </ul>
  }
}

export default Countries