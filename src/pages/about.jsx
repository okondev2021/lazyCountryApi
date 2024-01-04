import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import leftArrow from '../assets/arrow-left.svg'

const About = () => {

    // 
    const {slug} = useParams()
    const [countryDetails, setCountryDetail] = useState(null)
    useEffect( () => {
        fetch(`https://restcountries.com/v3.1/name/${slug}?fields=name,currencies,languages,tld,capital,population,region,subregion,flags,borders,altSpellings`)
        .then( response => response.json())
        .then(data => {setCountryDetail(data)})
    },[slug])
    
    // 
    const navigate = useNavigate()
    
    // 
    const [allCountries, setAllCountries] = useState(null)
    useEffect( () => {
        fetch('https://restcountries.com/v3.1/all?fields=name,cca3')
        .then( response => response.json())
        .then(data => {
            setAllCountries(data)
        })
    }, [])
    
    const test = (val) => {
        const allCountriesInfo = allCountries
        const matchingCountry = allCountriesInfo?.find(country => country.cca3 === val);
        if (matchingCountry) {
          return matchingCountry.name.common;
        }
      }


    return (
        <div className="min-h-screen bg-light-Background dark:bg-dark-Background text-light-Text dark:text-neutral">
            <section>
                <Navbar />
            </section>
            <section className="py-10 pt-16 px-14">
                <header>
                    <button className="flex items-center gap-3 px-6 py-2 rounded-md evenShadow" onClick={ () => navigate(-1)}>
                        <span><img src={leftArrow} alt="arrow" /></span>
                        <p>Back</p>
                    </button>
                </header>
                <main className="mt-10 ">
                    {countryDetails?.map( (country) => (
                        <div key={country.name.common} className="grid grid-cols-2">
                            <div className="col-span-1 ">
                                <img src={country.flags.png} alt="" />
                            </div>
                            
                            <div>
                                <div className="col-span-1 ">
                                    {country.borders.map( (border) => (
                                        <div key={border}>
                                            <Link to={`/about/${test(border)}`}>{test(border)}</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </div>

    )
}

export default About