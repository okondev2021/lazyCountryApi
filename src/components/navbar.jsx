import moonImg from '../assets/icon-moon.svg'
import sunImg from '../assets/icon-sun.svg'

import { useState } from 'react'

const Navbar = () => {

    const [isLightMode, setIsLightMode] = useState(true)
    
    const rootElement = document.querySelector('html')
    
    const themeChange = () => {
        if(isLightMode === true){
            setIsLightMode(false)
            rootElement.classList.add('dark')
        }
        else{
            setIsLightMode(true)
            rootElement.classList.remove('dark')
        }
    }


    return (
        <nav className='flex items-center justify-between py-5 shadow-md px-14 mobile:px-5 mobile:py-7 bg-light-Background dark:bg-dark-Background'>
            <div className="">
                <h1 className='text-xl font-bold mobile:text-sm'>Where in the world?</h1>
            </div>
            <div onClick={themeChange} className="flex items-center gap-2 mobile:text-sm">
                <img className='cursor-pointer' src={rootElement.classList.contains('dark')? sunImg: moonImg} alt="theme icon" />
                <p className='font-bold '>{rootElement.classList.contains('dark')? "Light": "Dark"} Mode</p>
            </div>
        </nav>
    )
}

export default Navbar