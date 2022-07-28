import axios from 'axios'
import {useState, useEffect} from 'react'

const Search = ({handleSearch, userInput}) => {
  return(
    <div>
      find countries <input onChange={handleSearch} value={userInput}></input>
    </div>
  )
}

const Weather = ({country}) =>{

  const api_key = process.env.REACT_APP_API_KEY
  const [wind, setWind] = useState("")
  const [temp, setTemp] = useState("")
  const capital = country.capital[0]
  const geoLocationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${api_key}`
  
  // I could've got latitude and longtide from Countries API response. However I didn't notice and retirieve them 
  // from anothre API instead based on capital of a country.
  useEffect(() => {
    console.log('effect')
    axios
      .get(geoLocationURL)
      .then(response =>{
        console.log(response.data)
        console.log('promise fulfilled for geo api')
        const lon = response.data[0].lon
        const lat = response.data[0].lat
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        return axios.get(weatherURL)
      })
      .then( response=> {
        console.log("weather info: ", response.data)
        setWind(response.data.wind.speed)
        // Convert Kelvin to Celsius
        setTemp(Math.round(response.data.main.temp - 273.15))
      })
  }, [])
  return(
    <div>
      <h1>Wheather in {capital}</h1>
      <p>temperature {temp} Celucius</p>
      <p>wind {wind} m/s</p>
    </div>
  )
} 

const CountryInfo = ({onlyCountry}) =>{
  return(
    <>
        <h1>{onlyCountry.name.official}</h1>
        <br></br>
        <p>Capital: {onlyCountry.capital[0]}</p>
        <p>Area: {onlyCountry.area}</p>
        <h3>Languages: </h3>
        <ul>
        {Object.values(onlyCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img alt="flag" src={onlyCountry.flags.png}></img></>
  )
}

const Countries = ({countriesToShow, setShow, show}) =>{
  
  const buttonClicked = (e)=>{
  setShow(Array(countriesToShow.length).fill(false))
  let copy = [...show]
  copy[e.target.value] = true
  setShow(copy)
  
    
  }
  if(countriesToShow.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if(countriesToShow.length === 1){
    
    return(
      <div>
        <CountryInfo onlyCountry={countriesToShow[0]}/>
        <Weather country={countriesToShow[0]}/>
      </div>
    )
  }else{
    return(
      <div>
        {
          countriesToShow.map(
            (country, index) => {
              if(show[index] === true){
                return(
                <>
                  <p key={country.name.official}>{country.name.official} 
                <button key={index} onClick={buttonClicked}>View</button>
                </p>  
                <CountryInfo onlyCountry={country}/>
                </>
                  )
              }else{
                return(
                  <>
                  <p key={country.name.official}>{country.name.official} 
                <button value={index} onClick={buttonClicked}>View</button>
                </p>  
                </>
                )
              }
            }

           )
        }
      </div>
    )
  }
}
// country.name.official 

const App = ()=>{
  const [show, setShow] = useState([])
  const [userInput, setUserInput] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const countriesURL = "https://restcountries.com/v3.1/all"

  useEffect(() => {
    console.log('effect')
    axios
      .get(countriesURL)
      .then(response =>{
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (e) =>{
    setUserInput(e.target.value)
    // create a list of countries based on user input 
    setCountriesToShow(
      countries.filter(
        country =>
         country.name.official.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
    setShow(Array(countriesToShow.length).fill(false))
    console.log(countriesToShow.length)


   }

  return(
    <div>
      <p>*Use an official name of a country to search</p>
      <Search userInput={userInput} handleSearch={handleSearch}/>
      <Countries countriesToShow={countriesToShow} show={show} setShow={setShow}/>
    </div>
  )
}

export default App;
