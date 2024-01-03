import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const About = () => {

    const {slug} = useParams()
    const [countryDetails, setCountryDetail] = useState(null)
    useEffect( () => {
        fetch(`https://restcountries.com/v3.1/name/${slug}`)
        .then( response => response.json())
        .then(data => {setCountryDetail(data)})
    },[slug])
    



    return (

        <div>
            {countryDetails?.map( (country) => (
                <div>hello {country.capital}</div>
            ))}
        </div>

    )
}

export default About