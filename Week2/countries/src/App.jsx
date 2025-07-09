import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search.jsx'
import './App.css'

function App() {
  const  [countries, Setcountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(
    () => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
       .then(response => {
          let data = response.data.map(country => country.name.common)
          Setcountries(data)
        })
    },
      []
  )

  const chagned = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <form>
        <div>find countries</div>
        <input id="searching" onChange={chagned}/>
        <Search search={search} countries={countries}/>
      </form>
    </>
  )
}

export default App
