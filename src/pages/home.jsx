import Navbar from "../components/navbar"
import { useEffect, useState} from "react"
import searchImg from '../assets/search.svg'
import arrow from '../assets/caret-down-fill.svg'
import { useRef } from "react"
const Home = () => {

    // 
    const [allCountries, setAllCountries] = useState(null)
    useEffect( () => {
        fetch('https://restcountries.com/v3.1/all')
        .then( response => response.json())
        .then(data => {
            setAllCountries(data)
        })
    }, [])

    // 
    const regionRef = useRef(null)
    const [displayRegions, setDisplayRegions] = useState(false)
    const toggleDisplayRegions = () => {
        if(displayRegions !== true){
            regionRef.current.classList.remove('hidden')
            setDisplayRegions(true)
        }
        else{
            regionRef.current.classList.add('hidden')
            setDisplayRegions(false)
        } 
    }

    // 
    const selectedRegion = (event) => {
        const region = event.target.dataset.name
        fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then( response => response.json())
        .then(data => {
            setAllCountries(data)
        })

        regionRef.current.classList.add('hidden')
        setDisplayRegions(false)
    }

    // 

    return (
        <div className=" bg-light-Background dark:bg-dark-Background text-light-Text dark:text-neutral min-h-screen">
            <>
                <Navbar />
            </>
            <section className=" px-14 py-10">
                <header className="grid grid-cols-6">

                    <div className=" col-span-2 flex items-center gap-4 evenShadow rounded-md py-4 px-4">
                        <label htmlFor="countrySearch">
                            <img src={searchImg} alt="search icon" />
                        </label>
                        <form className=" w-full bg-red-950">
                            <input className=" outline-none bg-light-Background dark:bg-dark-Background w-full" id="countrySearch" type="text" placeholder="Search for country..." />
                        </form>
                    </div>
                    
                    <div className=" col-start-6 col-span-1 z-50">
                        <div onClick={toggleDisplayRegions} className=" cursor-pointer rounded-md evenShadow px-5 py-4 flex justify-between">
                            <p>Filter by Region</p>
                            <img src={arrow} alt="" />
                        </div>
                        <div ref={regionRef} className=" rounded-md relative mt-3 z-40 hidden">
                            <ul className="evenShadow absolute top-0 left-0 w-full rounded-md z-40">
                                <li onClick={ (e) => selectedRegion(e)} className=" pl-6 py-1 cursor-pointer" data-name="Africa">Africa</li>
                                <li onClick={ (e) => selectedRegion(e)} className=" pl-6 py-1 cursor-pointer" data-name="America">America</li>
                                <li onClick={ (e) => selectedRegion(e)} className=" pl-6 py-1 cursor-pointer" data-name="Asia">Asia</li>
                                <li onClick={ (e) => selectedRegion(e)} className=" pl-6 py-1 cursor-pointer" data-name="Europe">Europe</li>
                                <li onClick={ (e) => selectedRegion(e)} className=" pl-6 py-1 cursor-pointer" data-name="Oceania">Oceania</li>
                            </ul>
                        </div>
                    </div>
                    
                </header>
                {/*  */}
                <main className="grid grid-cols-4 mt-10 gap-5 z-0">
                    {allCountries?.map( (country) => (
                    <div>
                        <img src={country.flags.png} alt="" />
                        <h2>{country.name.common}</h2>
                        <p>Population:{country.population}</p>
                        <p>Region: {country.region}</p>
                        <p>Capital: {country.capital}</p>
                    </div>
                ))}
                </main>
            </section>
        </div>
    )
}

export default Home