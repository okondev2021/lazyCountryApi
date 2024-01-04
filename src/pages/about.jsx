import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import leftArrow from '../assets/arrow-left.svg'

const About = () => {

    // 
    const {slug} = useParams()
    const [countryDetails, setCountryDetail] = useState(null)
    useEffect( () => {
        fetch(`https://restcountries.com/v3.1/name/${slug}?fullText=true?fields=name,currencies,languages,tld,capital,population,region,subregion,flags,borders,altSpellings`)
        .then( response => response.json())
        .then(data => {setCountryDetail(data)})
    },[slug])
    console.log(countryDetails)
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
    // 
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
                        <div key={country.name.common} className="grid grid-cols-5">
                            <div className="col-span-3">
                                <img className="w-full h-full" src={country.flags.png} alt="" />
                            </div>
                            <div className="col-span-2">
                                <div><h1>{country.name.common}</h1></div>
                                <section>
                                    <div>Native Name: <span>{country.name.nativeName[Object.keys(country.name.nativeName)[0]]?.official  }</span></div>
                                    <div>Population: <span>{country.population}</span></div>
                                    <div>Region:<span>{country.region}</span></div>
                                    <div>Sub Region: <span>{country.subregion}</span></div>
                                    <div>Capital:<span>{country.capital}</span></div>
                                    <div>Top Level Domain<span>{country.tld}</span></div>
                                    <div>Currencies:<span>{country.currencies[Object.keys(country.currencies)[0]].name}</span></div>
                                    <div><span></span></div>
                                </section>
                                <div></div>
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </div>

    )
}

export default About