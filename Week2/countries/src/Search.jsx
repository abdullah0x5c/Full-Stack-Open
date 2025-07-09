import Country from './Country.jsx'

const Search = ({search, countries}) => {

  const items = countries.filter(country => country.toLowerCase().includes(search.toLowerCase()))
  console.log(items)

  if(items.length == 1){
    return(
      <>
        <Country country={items[0]}/>
      </>
    )
  }
  else{
    const itemsShown = items.map(item => <li key={item}>{item}</li>)
    return (
    <>
      <ul>
        {itemsShown}
      </ul>
    </>
  )}
}

export default Search