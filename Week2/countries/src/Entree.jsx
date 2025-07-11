import Country from './Country.jsx'
import { useState } from 'react'

const Entree = ({country}) => {


    const [toggle, setState] = useState(0)

    const changeState = () => setState(!toggle)

    if(toggle == 0){

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