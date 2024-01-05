import moonImg from '../assets/icon-moon.svg'
import sunImg from '../assets/icon-sun.svg'

import { useState } from 'react'

const Navbar = () => {

    const [isDarkMode, setIsLightMode] = useState(false)

    const themeChange = () => {
        const rootElement = document.querySelector('html')
        if(isDarkMode === false){
            setIsLightMode(true)
            rootElement.classList.add('dark')
        }
        else{
            setIsLightMode(false)
            rootElement.classList.remove('dark')
        }
    }

    return (
        <nav className='flex items-center justify-between py-5 shadow-md px-14 mobile:px-5 mobile:py-7 bg-light-Background dark:bg-dark-Background'>
            <div className="">
                <h1 className='text-xl font-bold mobile:text-lg'>Where in the world?</h1>
            </div>
            <div onClick={themeChange} className="flex items-center gap-2">
                <img className='cursor-pointer' src={isDarkMode? sunImg: moonImg} alt="theme icon" />
                <p className='font-bold '>{isDarkMode? "Light": "Dark"} Mode</p>
            </div>
        </nav>
    )
}

export default Navbar