import { Bell, UserCircle, History, LogOut, Settings } from 'lucide-react'

import { useState, useRef, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

function Navbar() {

    const [showProfileMenu, setShowProfileMenu] =
        useState(false)

    const [showSettings, setShowSettings] = useState(false)

    const profileRef = useRef(null)

    const settingsRef = useRef(null)

    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') !== 'light')

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add(
                'dark'
            )

            localStorage.setItem(
                'theme',
                'dark'
            )

        } else {
            document.documentElement.classList.remove(  
                'dark'
            )

            localStorage.setItem(
                'theme',
                'light'
            )
        }
    }, [darkMode])

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileRef.current && 
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false)
            }

            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setShowSettings(false)
            }
        }

        document.addEventListener(
            'mousedown',
            handleClickOutside
        )

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            )
        }
    }, [])

    const navigate = useNavigate()

    const userEmail =
        localStorage.getItem("userEmail")

    return (

        <div className='flex items-center justify-between w-full h-16 px-8 bg-white border-b dark:bg-slate-900 border-slate-300 dark:border-slate-800'>

            <div>
                <h1 className='text-xl font-semibold tracking-wide text-black dark:text-white'>
                    AI Mock Interview
                </h1>

                <p className='mt-1 text-xs text-slate-600 dark:text-slate-400'>
                    Interview Preparation Platform
                </p>
            </div>

            <div className='relative flex items-center gap-5'>

                {/* Bell Icon */}
                <div className='relative group'>

                    <button className='p-2 transition-all duration-300 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800'>
                        <Bell
                            className='text-slate-700 dark:text-slate-300'
                            size={20}
                        />
                    </button>

                    {/* Notifications */}
                    <div className='absolute right-0 z-50 hidden w-64 p-4 mt-3 bg-white border shadow-xl dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-xl group-hover:block'>

                        <h2 className='mb-3 text-sm font-semibold text-black dark:text-white'>
                            Notifications
                        </h2>

                        <p className='text-sm text-slate-600 dark:text-slate-400'>
                            No notifications available
                        </p>

                    </div>

                </div>

                {/* Profile */}
                <div className='relative' ref={profileRef}>

                    <button 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className='flex items-center gap-2 px-3 py-2 transition-all duration-300 cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl'
                    >
                        <UserCircle
                            className='text-slate-700 dark:text-slate-300'
                            size={24}
                        />
                        <span className='text-sm font-medium text-slate-800 dark:text-slate-200'>
                            {
                                localStorage.getItem("userName")
                                    ? localStorage.getItem("userName").toUpperCase()
                                    : "USER"
                            }
                        </span>
                    </button>

                    {
                        showProfileMenu && (

                            <div className='absolute right-0 z-50 mt-3 overflow-hidden bg-white border shadow-2xl w-72 dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'>

                                {/* User Details */}
                                <div className='px-5 py-4 border-b border-slate-300 dark:border-slate-800'>

                                    <h2 className='mb-1 text-base font-semibold text-black dark:text-white'>
                                        {
                                            localStorage.getItem("userName")
                                                ? localStorage
                                                    .getItem("userName")
                                                    .toUpperCase()
                                                : "USER"
                                        }
                                    </h2>

                                    <p className='text-sm break-all text-slate-600 dark:text-slate-400'>
                                        {userEmail}
                                    </p>

                                </div>

                                {/* History */}
                                <button
                                    onClick={() =>
                                        navigate('/history')
                                    }
                                    className='flex items-center w-full gap-3 px-5 py-3 text-sm transition-all duration-300 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                >

                                    <History size={18} />

                                    History

                                </button>

                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className='flex items-center w-full gap-3 px-5 py-3 text-sm transition-all duration-300 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                >
                                    <Settings size={18} />

                                    Settings
                                </button>

                                {/* Logout */}
                                <button
                                    onClick={() => {

                                        navigate('/')

                                    }}
                                    className='flex items-center w-full gap-3 px-5 py-3 text-sm text-red-500 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                >

                                    <LogOut size={18} />

                                    Logout

                                </button>

                            </div>

                        )
                    }

                    {
                        showSettings && (
                            <div ref={settingsRef} className='absolute z-50 overflow-hidden bg-white border shadow-2xl top-20 right-80 w-72 dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'>
                                <div className='px-5 py-4 border-b border-slate-300 dark:border-slate-800'>
                                    <h2 className='text-base font-semibold text-black dark:text-white'>
                                        Settings
                                    </h2>
                                </div>

                                <div className='p-5 space-y-5'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-slate-700 dark:text-slate-300'>
                                            Dark Mode
                                        </span>

                                        <input 
                                            type='checkbox'
                                            checked={darkMode}
                                            onChange={() => setDarkMode(!darkMode)}
                                        />
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-slate-700 dark:text-slate-300'>
                                            Notifications
                                        </span>

                                        <input 
                                            type='checkbox'
                                            defaultChecked
                                        />
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-slate-700 dark:text-slate-300'>
                                            Sound
                                        </span>

                                        <input 
                                            type='checkbox'
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default Navbar