import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import api from '../services/api'
import '../index.css'

function History() {

    const currentUser =
        JSON.parse(localStorage.getItem("user"))

    const userEmail =
        currentUser?.email

    const [interviewHistory, setInterviewHistory] =
        useState([])

    const [codingHistory, setCodingHistory] =
        useState([])

    useEffect(() => {

        fetchHistory()

    }, [])

    const fetchHistory = async () => {

        try {

            const interviewResponse =
                await api.get(
                    `/analytics/${userEmail}`
                )

            setInterviewHistory(
                interviewResponse.data
            )

            const codingResponse =
                await api.get(
                    `/coding-history/${userEmail}`
                )

            setCodingHistory(
                codingResponse.data
            )

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className='min-h-screen bg-white dark:bg-slate-950'>

            <Sidebar />

            <div className='min-h-screen ml-64'>

                <Navbar />

                <div className='p-8 space-y-14'>

                    {/* INTERVIEW HISTORY */}

                    <h1 className='mb-2 text-3xl font-semibold text-black dark:text-white'>
                        Interview History
                    </h1>

                    <p className='mb-8 text-sm text-slate-600 dark:text-slate-400'>
                        Review your previous interview sessions and AI feedback
                    </p>

                    <div className='mb-16 space-y-6'>

                        {
                            interviewHistory.length === 0
                                ? (
                                    <div className='p-8 text-base text-center bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400'>
                                        No Interview History Found
                                    </div>
                                )
                                : (
                                    interviewHistory.map((item) => (

                                        <div
                                            key={item.id}
                                            className='p-6 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'
                                        >

                                            <h2 className='mb-4 text-lg font-semibold leading-8 text-black dark:text-white'>
                                                {item.question}
                                            </h2>

                                            <p className='mb-2 text-sm font-medium text-blue-600 dark:text-blue-400'>
                                                Domain: {item.domain}
                                            </p>

                                            <p className='mb-3 text-sm font-medium text-emerald-600 dark:text-emerald-400'>
                                                Score: {item.score}
                                            </p>

                                            <p className='text-sm leading-7 text-slate-700 dark:text-slate-300'>
                                                {item.feedback}
                                            </p>

                                        </div>

                                    ))
                                )
                        }

                    </div>

                    {/* CODING HISTORY */}

                    <h1 className='mb-2 text-3xl font-semibold text-black dark:text-white'>
                        Coding History
                    </h1>

                    <p className='mb-8 text-sm text-slate-400'>
                        View your coding practice sessions and AI evaluations
                    </p>

                    <div className='space-y-6'>

                        {
                            codingHistory.length === 0
                                ? (
                                    <div className='p-8 text-base text-center bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400'>
                                        No Coding History Found
                                    </div>
                                )
                                : (
                                    codingHistory.map((item) => (

                                        <div
                                            key={item.id}
                                            className='p-6 border bg-slate-900 border-slate-800 rounded-2xl'
                                        >

                                            <h2 className='mb-4 text-lg font-semibold leading-8 text-white'>
                                                {item.question}
                                            </h2>

                                            <p className='mb-3 text-sm font-medium text-blue-400'>
                                                Language: {item.language}
                                            </p>

                                            <pre className='text-sm leading-7 whitespace-pre-wrap text-slate-700 dark:text-slate-300'>
                                                {item.feedback}
                                            </pre>

                                        </div>

                                    ))
                                )
                        }

                    </div>

                </div>

            </div>

        </div>

    )
}

export default History