import Country from "./Country"

const Countries = ({countriesToShow}) => {
  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countriesToShow.length > 0 && countriesToShow.length < 10){
    return <ul>
            {countriesToShow.map((country) => (
              <Country key={country.cca3} country={country} />
            ))}
          </ul>
  }
}

export default Countries