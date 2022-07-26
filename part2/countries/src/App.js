import axios from 'axios'
import {useState, useEffect} from 'react'

const Search = ({handleSearch, userInput}) => {
  return(
    <div>
      find countries <input onChange={handleSearch} value={userInput}></input>
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
        <img src={onlyCountry.flags.png}></img></>
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
      <CountryInfo onlyCountry={countriesToShow[0]}/>
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
              <p key={country.name.official}>{country.name.official} 
              <button onClicked={buttonClicked}>View</button>
              </p>  

              return <></>
              
            
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
