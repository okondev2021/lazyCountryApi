import Navbar from "../components/navbar"
import { useEffect, useState} from "react"
import { useRef } from "react"
import { Link } from "react-router-dom"
const Home = () => {

    // 
    const [allCountries, setAllCountries] = useState(null)
    useEffect( () => {
        fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,altSpellings')
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
        const url = region === 'All' ? "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region": `https://restcountries.com/v3.1/region/${region}?fields=name,capital,flags,population,region`
        fetch(url)
        .then( response => response.json())
        .then(data => setAllCountries(data))
        .finally( () => {
            regionRef.current.classList.add('hidden')
            setDisplayRegions(false)
        })
    }

    //
    const inputRef = useRef(null)
    inputRef.current?.addEventListener('keyup', () => {
        const countryName = inputRef.current.value
        fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region`)
        .then( response => response.json())
        .then(data => {
            setAllCountries(data.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase())))
        })

    })




    return (
        <div className="min-h-screen bg-light-Background dark:bg-dark-Background text-light-Text dark:text-neutral font-body">
            <>
                <Navbar />
            </>
            <section className="py-10 pt-16 px-14 mobile:px-5 mobile:py-10">
                <header className="grid flex-col grid-cols-6 mobile:grid-cols-1 mobile:grid-rows-2 mobile:gap-6">

                    <div className="flex items-center col-span-2 gap-4 px-4 rounded-md mobile:row-span-1 evenShadow h-14">
                        <label htmlFor="countrySearch">
                            <i class="bi bi-search"></i>
                        </label>
                        <form className="w-full h-full">
                            <input ref={inputRef} className="w-full h-full rounded-md outline-none bg-light-Background dark:bg-dark-Background" id="countrySearch" type="text" placeholder="Search for country..." />
                        </form>
                    </div>
                    
                    <div className="col-span-1 col-start-6 mobile:w-[70%] mobile:col-start-1">
                        <div onClick={toggleDisplayRegions} className="flex justify-between px-4 py-4 mb-3 rounded-md cursor-pointer evenShadow">
                            <p className=" mobile:text-sm md:text-sm">Filter by Region</p>
                            <i class="bi bi-caret-down-fill"></i>
                        </div>
                        <div ref={regionRef} className="relative hidden rounded-md ">
                            <ul className="absolute top-0 left-0 z-50 w-full rounded-md bg-light-Background evenShadow">
                                <li onClick={ (e) => selectedRegion(e)} className="py-1 pl-6 cursor-pointer " data-name="All">All</li>
                                <li onClick={ (e) => selectedRegion(e)} className="py-1 pl-6 cursor-pointer " data-name="Africa">Africa</li>
                                <li onClick={ (e) => selectedRegion(e)} className="py-1 pl-6 cursor-pointer " data-name="America">America</li>
                                <li onClick={ (e) => selectedRegion(e)} className="py-1 pl-6 cursor-pointer " data-name="Asia">Asia</li>
                                <li onClick={ (e) => selectedRegion(e)} className="py-1 pl-6 cursor-pointer " data-name="Europe">Europe</li>
                                <li onClick={ (e) => selectedRegion(e)} className="py-1 pl-6 cursor-pointer " data-name="Oceania">Oceania</li>
                            </ul>
                        </div>
                    </div>
                    
                </header>
                {/*  */}
                <div className="relative grid grid-cols-4 mt-10 gap-14 mobile:grid-cols-1 md:grid-cols-3 tab:grid-cols-2">
                    {allCountries?.map( (country) => (
                        <Link to={`/about/${country.name.official}`}>
                            <div key={country.capital} className="rounded-md evenShadow card min-h-80 mobile:w-[85%] mx-auto ">  
                                <div className="w-full h-40 rounded-md countryFlag">
                                    <img src={country.flags.png} className="w-full h-full rounded-t-md" alt="" />
                                </div>
                                <div className="countryInfo w-[85%] mx-auto pt-4 pb-10">
                                    <h2 className="font-bold ">{country.name.common}</h2>
                                    <section className="pt-4">
                                        <p className="mb-1 font-medium ">Population: <span className="font-normal text-light-Input ">{country.population}</span></p>
                                        <p className="mb-1 font-medium ">Region: <span className="font-normal text-light-Input ">{country.region}</span></p>
                                        <p className="mb-1 font-medium ">Capital: <span className="font-normal text-light-Input ">{country.capital}</span></p>
                                    </section>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home