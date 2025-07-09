import Country from './Country.jsx'
import { useState } from 'react'

const Entree = ({country}) => {

    console.log("2 ", country)


    const [toggle, setState] = useState(0)

    const changeState = () => setState(!toggle)

    if(toggle == 0){
        console.log(country)

        return (
            <>
            <br />
            {country}<button type='button' onClick={changeState}>Show</button>
            </>
        )
    }
    else {
        return (
            <>
            <br />
            <Country country={country} /><button type='button' onClick={changeState}>Hide</button>
            </>
        )
    }
}

export default Entree