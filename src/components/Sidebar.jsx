import { LayoutDashboard, BrainCircuit, BarChart3, LogOut, Code2, Clock3 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("user"))

    const userEmail = currentUser?.email || "guest"

    return (
        <div className='fixed top-0 left-0 flex flex-col w-64 h-screen bg-white border-r dark:bg-slate-950 border-slate-300 dark:border-slate-800'>
            <div className='py-8 border-b px-7 border-slate-300 dark:border-slate-800'>
                <h1 className='text-xl font-semibold tracking-wide text-black dark:text-white'>
                    Interview AI
                </h1>
                <p className='mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400'>
                    AI Powered Interview Preparation Platform
                </p>
            </div>

            <div className='flex flex-col gap-2 px-4 py-6'>
                <Link 
                    to='/dashboard'
                    className='flex items-center gap-3 px-4 py-3 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl'
                >
                    <LayoutDashboard size={20} />
                    <span className='text-sm font-medium'>Dashboard</span>
                </Link>

                <Link 
                    to={`/interview?domain=${localStorage.getItem(`${JSON.parse(localStorage.getItem("user"))?.email}_selectedDomain`) || ''}`}
                    className='flex items-center gap-3 px-4 py-3 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl'
                >
                    <BrainCircuit size={20} />
                    <span className='text-sm font-medium'>Interview</span>
                </Link>

                <Link 
                    to='/coding'
                    className='flex items-center gap-3 px-4 py-3 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl'
                >
                    <Code2 size={20} />

                    <span className='text-sm font-medium'>
                        Coding
                    </span>
                </Link>

                <Link 
                    to='/analytics'
                    className='flex items-center gap-3 px-4 py-3 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl'
                >
                    <BarChart3 size={20} />
                    <span className='text-sm font-medium'>Analytics</span>
                </Link>

                <Link to="/history" className='flex items-center gap-3 px-4 py-3 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl'>

                    <Clock3 size={20} />

                    <span className='text-sm font-medium'>
                        History
                    </span>

                </Link>
            </div>
            <div className='p-4 mt-auto border-t border-slate-300 dark:border-slate-800'>
                <div className='px-3 mb-5'>
                    <p className='mb-1 text-xs text-slate-500 dark:text-slate-500'>
                        Logged in as
                    </p>
                    <p className='text-sm break-all text-slate-700 dark:text-slate-300'>
                        {userEmail}
                    </p>
                </div>
                <button
                    onClick={() => {

                        navigate('/')
                    }}
                className='flex items-center w-full gap-3 px-4 py-3 text-red-500 transition-all duration-300 cursor-pointer hover:bg-red-500/10 rounded-xl'
                >
                    <LogOut size={20} />

                    <span className='text-sm font-medium'>
                        Logout
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar