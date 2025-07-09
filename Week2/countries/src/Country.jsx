import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
    
    const [countryData, setCountryData] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => setCountryData(response.data))
        .catch(error => {
          if(error.status == 404){
            return(
              setError("Not Found")
            )
          }
          else{
            return(
                setError(error.message)
            )
          }
        }) 
    }, [country])

    if(error){
        return(
            <div>{error}</div>
        )
    }
    else if(!countryData){
        return(
            <div>Loading....</div>
        )
    }
    else{
        const langs = Object.values(countryData.languages).map(({code, name}) => <ul key={code}>{name}</ul>) 
        return(
            <>
                <h3>{countryData.name.official}</h3>
                <div>capital {countryData.capital[0]}</div>
                <div>Area {countryData.area}</div>
                <h3>Languages</h3>
                <ul>{langs}</ul>
                <img src={countryData.flags.png} alt="flag" />
            </>
        )
    }
}

export default Country