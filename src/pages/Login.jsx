import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGithub, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoSparkles } from 'react-icons/io5'
import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e) => {

        e.preventDefault()

        setError('')

        if (!email || !password) {

            setError('Please fill all fields')
            return
        }

        try {

            setLoading(true)

            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                {
                    email,
                    password
                }
            )

            console.log(JSON.stringify(response.data))

            localStorage.setItem(
                'user',
                JSON.stringify(response.data)
            
            )

            localStorage.setItem(
                'userEmail',
                email
            )

            localStorage.setItem(
                "userName",
                response.data.username
            )

            navigate('/dashboard')

        } catch (err) {

            if (err.response?.data?.message) {

                setError(err.response.data.message)

            } else {

                setError('Login failed')
            }

        } finally {

            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)

            const user = result.user

            console.log(user)

            localStorage.setItem("user", JSON.stringify(user))

            localStorage.setItem("userName", user.displayName)

            localStorage.setItem("userEmail", user.email)

            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className='min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8'>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-5xl rounded-2xl border border-slate-800 overflow-hidden bg-slate-900 flex flex-col lg:flex-row'
            >

                {/* LEFT SIDE */}

                <div className='lg:w-1/2 bg-slate-950 flex flex-col items-center justify-center text-center p-10 border-r border-slate-800'>

                    <h1 className='text-4xl font-semiboldbold text-white mb-6'>
                        LOGIN
                    </h1>

                    <p className='text-slate-400 text-base leading-8 max-w-sm'>
                        To keep connected with us please login with your personal info
                    </p>

                    <div className='mt-10 space-y-4 text-slate-300 text-sm'>

                        <p>✔ Secure Data Storage</p>

                        <p>✔ AI Based Interview System</p>

                        <p>✔ Real-Time Performance Tracking</p>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className='lg:w-1/2 relative bg-slate-900 p-8 lg:p-10'>

                    <div></div>

                    <div className='relative z-10'>

                        <div className='flex items-center gap-3 mb-10'>

                            <IoSparkles className='text-blue-300 text-2xl' />

                            <h2 className='text-3xl font-semibold text-white'>
                                Welcome Back
                            </h2>

                        </div>

                        <form
                            onSubmit={handleLogin}
                            className='space-y-6'
                        >

                            {/* EMAIL */}

                            <div className='flex items-center gap-3 border border-slate-700 bg-slate-950 rounded-xl px-4 py-4'>

                                <FaEnvelope className='text-slate-400 text-xl' />

                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='bg-transparent w-full outline-none text-white placeholder-slate-500 text-sm'
                                />

                            </div>

                            {/* PASSWORD */}

                            <div className='flex items-center gap-3 border border-slate-700 bg-slate-950 rounded-xl px-4 py-4'>

                                <FaLock className='text-blue-200 text-lg' />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='bg-transparent w-full outline-none text-blue-200 placeholder-slate-500 text-sm'
                                />

                                <button 
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='text-slate-400 text-lg'
                                >
                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }
                                </button>

                            </div>

                            {/* OPTIONS */}

                            <div className='flex justify-between items-center text-slate-200 text-sm'>

                                <label className='flex items-center gap-2 cursor-pointer'>

                                    <input type='checkbox' />

                                    Remember me

                                </label>

                                <button
                                    type='button'
                                    className='text-blue-400 hover:text-blue-300'
                                >
                                    Forgot Password?
                                </button>

                            </div>

                            {/* ERROR */}

                            {
                                error &&
                                <p className='text-red-400 text-sm'>
                                    {error}
                                </p>
                            }

                            {/* LOGIN BUTTON */}

                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-300 cursor-pointer'
                            >

                                {
                                    loading
                                        ? 'Logging In...'
                                        : 'Login'
                                }

                            </button>

                        </form>

                        {/* SOCIAL LOGIN */}

                        <div className='mt-10 text-center'>

                            <p className='text-slate-300 mb-6'>
                                Or continue with
                            </p>

                            <div className='flex justify-between gap-4 mt-6'>

                                <button onClick={handleGoogleLogin} className='bg-slate-950 hover:bg-slate-800 border border-slate-700 transition-all px-5 py-3 rounded-xl text-white text-sm flex items-center gap-3'>
                                        <FcGoogle className='text-2xl' />
                                    Google
                                </button>

                                <button className='bg-slate-950 hover:bg-slate-800 border border-slate-700 transition-all px-5 py-3 rounded-xl text-white text-sm flex items-center gap-3'>
                                    <FaFacebook className='text-blue-500 text-2xl' />
                                    Facebook
                                </button>

                                <button className='bg-slate-950 hover:bg-slate-800 border border-slate-700 transition-all px-5 py-3 rounded-xl text-white text-sm flex items-center gap-3'>
                                    <FaGithub className='text-2xl'/>
                                    GitHub
                                </button>

                            </div>

                        </div>

                        {/* SIGNUP */}

                        <p className='text-center text-slate-400 mt-8 text-sm'>

                            Don't have an account?

                            <Link
                                to='/signup'
                                className='text-blue-400 ml-2 hover:text-blue-300 font-medium'
                            >
                                Sign Up
                            </Link>

                        </p>

                    </div>

                </div>

            </motion.div>

        </div>

    )

}

export default Login