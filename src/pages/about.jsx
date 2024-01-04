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
                        <div key={country.name.common} className="flex justify-between gap-20">
                            <div className=" w-[50%]">
                                <img className="w-[90%] h-[70%] mx-auto" src={country.flags.png} alt="" />
                            </div>
                            <div className=" w-[50%]">
                                <div>
                                    <h1 className="text-3xl font-bold">{country.name.common}</h1>
                                </div>
                                <section className="grid grid-cols-2 mt-8 ">
                                    <div>
                                        <div className="mb-3 font-medium ">Native Name: <span className="font-normal text-light-Input">{country.name.nativeName[Object.keys(country.name.nativeName)[0]]?.official  }</span></div>
                                        <div className="mb-3 font-medium ">Population: <span className="font-normal text-light-Input">{country.population}</span></div>
                                        <div className="mb-3 font-medium ">Region: <span className="font-normal text-light-Input">{country.region}</span></div>
                                        <div className="mb-3 font-medium ">Sub Region: <span className="font-normal text-light-Input">{country.subregion}</span></div>
                                        <div className="mb-3 font-medium ">Capital: <span className="font-normal text-light-Input">{country.capital}</span></div>
                                    </div>
                                    <div>
                                        <div className="mb-3 font-medium ">Top Level Domain: <span className="font-normal text-light-Input">{country.tld}</span></div>
                                        <div className="mb-3 font-medium ">Currencies: <span className="font-normal text-light-Input">{country.currencies[Object.keys(country.currencies)[0]].name}</span></div>
                                        <div className="mb-3 font-medium">Language: 
                                            {Object.keys(country.languages).map( (language) => (
                                                <span className="font-normal text-light-Input" key={language}> {country.languages[language]},</span>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                                <div className="flex mt-8">
                                    <div>
                                        <h1 className="font-medium">Border Countries: </h1>
                                    </div>
                                    <div className="grid grid-cols-4 ml-1 gap-x-3 gap-y-3">
                                        {country.borders.map( (border) => (
                                            <div key={border} className="flex items-center justify-center px-2 py-2 ml-1 text-xs border-2 rounded-md cursor-pointer border-light-Input">
                                                <Link to={`/about/${test(border)}`}>{test(border)}</Link>
                                            </div>
                                        ))}
                                    </div>
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