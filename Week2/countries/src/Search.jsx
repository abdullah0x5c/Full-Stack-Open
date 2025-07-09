import Country from './Country.jsx'
import Entree from './Entree.jsx'

const Search = ({search, countries}) => {


  const items = countries.filter(country => country.toLowerCase().includes(search.toLowerCase()))

  if(items.length == 1){
    return(
      <>
        <Country country={items[0]}/>
      </>
    )
  }
  if(items.length > 10){
    return(
      <>
        <br />
        Too many matches, try to be more specific
      </>
    )
  }
  else{

    const itemsShown = items.map(item => {
        return(
        <Entree country={item}/>
      )
  })
    return (
    <>
        {itemsShown}
    </>
  )}
}

export default Search