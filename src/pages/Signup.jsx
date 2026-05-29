import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaGithub, FaFacebook, FaEyeSlash, FaEye } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoSparkles } from 'react-icons/io5'
import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

function Signup() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleSignup = async (e) => {

        e.preventDefault()

        setError('')
        setSuccess('')

        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            setError('Please fill all fields')
            return
        }

        if (password.length < 6) {

            setError('Password must be at least 6 characters')
            return
        }

        if (password !== confirmPassword) {

            setError('Passwords do not match')
            return
        }

        try {

            setLoading(true)

            const response = await axios.post(
                'http://localhost:8080/api/auth/signup',
                {
                    username,
                    email,
                    password
                }
            )

            setSuccess(response.data.message)

            setTimeout(() => {
                navigate('/')
            }, 1500)

        } catch (err) {

            if (err.response?.data?.message) {

                setError(err.response.data.message)

            } else {

                setError('Signup failed')
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

                <div className='lg:w-1/2 bg-slate-900 p-8 lg:p-10'>

                    <div></div>

                    <div className='relative z-10'>

                        <div className='flex items-center gap-3 mb-10'>

                            <IoSparkles className='text-blue-400 text-2xl' />

                            <h2 className='text-2xl font-semibold text-white'>
                                Create Account
                            </h2>

                        </div>

                        <form
                            onSubmit={handleSignup}
                            className='space-y-6'
                        >

                            {/* USERNAME */}

                            <div className='flex items-center gap-3 border border-slate-700 bg-slate-950 rounded-xl px-4 py-4'>

                                <FaUser className='text-slate-400 text-xl' />

                                <input
                                    type='text'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='bg-transparent w-full outline-none text-white placeholder-slate-500 text-sm'
                                />

                            </div>

                            {/* EMAIL */}

                            <div className='flex items-center gap-3 border border-slate-700 bg-slate-950 rounded-xl px-4 py-4'>

                                <FaEnvelope className='text-cyan-200 text-xl' />

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

                                <FaLock className='text-cyan-200 text-xl' />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='bg-transparent w-full outline-none text-white placeholder-slate-500 text-sm'
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

                            {/* CONFIRM PASSWORD */}

                            <div className='flex items-center gap-3 border border-slate-700 bg-slate-950 rounded-xl px-4 py-4'>

                                <FaLock className='text-slate-400 text-lg' />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='bg-transparent w-full outline-none text-white placeholder-slate-500 text-sm'
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

                            {/* ERROR MESSAGE */}

                            {
                                error &&
                                <p className='text-red-400 text-sm'>
                                    {error}
                                </p>
                            }

                            {/* SUCCESS MESSAGE */}

                            {
                                success &&
                                <p className='text-green-400 text-sm'>
                                    {success}
                                </p>
                            }

                            {/* TERMS */}

                            <div className='flex items-center gap-3 text-slate-400 text-sm'>

                                <input type='checkbox' required />

                                <p>
                                    I agree to terms & conditions
                                </p>

                            </div>

                            {/* REGISTER BUTTON */}

                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-300 cursor-pointer'
                            >

                                {
                                    loading
                                        ? 'Creating Account...'
                                        : 'Register'
                                }

                            </button>

                        </form>

                        {/* SOCIAL LOGIN */}

                        <div className='mt-10 text-center'>

                            <p className='text-slate-300 mb-6'>
                                Or continue with
                            </p>

                            <div className='flex justify-center gap-5'>

                                <button onClick={handleGoogleLogin} className='bg-slate-950 hover:bg-slate-800 border border-slate-700 transition-all px-5 py-3 rounded-xl text-white text-sm flex items-center gap-3'>
                                    <FcGoogle className='text-2xl' />
                                    Google
                                </button>

                                <button className='bg-slate-950 hover:bg-slate-800 border border-slate-700 transition-all px-5 py-3 rounded-xl text-white text-sm flex items-center gap-3'>
                                    <FaFacebook className=' text-blue-500 text-2xl' />
                                    Facebook
                                </button>

                                <button className='bg-slate-950 hover:bg-slate-800 border border-slate-700 transition-all px-5 py-3 rounded-xl text-white text-sm flex items-center gap-3'>
                                    <FaGithub className='text-2xl' />
                                    GitHub
                                </button>

                            </div>

                        </div>

                        {/* LOGIN LINK */}

                        <p className='text-center text-slate-400 mt-8 text-sm'>

                            Already have an account?

                            <Link
                                to='/'
                                className='text-blue-400 ml-2 hover:text-blue-300 font-medium'
                            >
                                Sign In
                            </Link>

                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className='lg:w-1/2 bg-slate-950 border-l border-slate-800 flex flex-col items-center justify-center text-center p-10'>

                    <h1 className='text-4xl font-semibold text-white mb-6'>
                        REGISTER
                    </h1>

                    <p className='text-slate-400 text-base leading-8 max-w-sm'>
                        Enter your personal details and start your AI interview journey with us
                    </p>

                    <div className='mt-10 space-y-4 text-slate-300 text-sm'>

                        <p>✔ AI Powered Mock Interviews</p>

                        <p>✔ Personalized Feedback System</p>

                        <p>✔ Adaptive Difficulty Evaluation</p>

                    </div>

                </div>

            </motion.div>

        </div>

    )

}

export default Signup