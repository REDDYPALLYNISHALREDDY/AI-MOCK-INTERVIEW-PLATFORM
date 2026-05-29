import { useEffect, useState } from 'react'
import api from '../services/api';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import '../index.css'

function Analytics() {

    const [sessions, setSessions] = useState([])

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            const currentUser = JSON.parse(localStorage.getItem("user"))

            const userEmail = currentUser?.email

            const response = await api.get(`/analytics/${userEmail}`)

            const formattedData = response.data.map((item, index) => ({
                id: item.id,
                name: `Q${index + 1}`,
                score: parseInt(item.score) || 0,
                question: item.question || "No Question",
                feedback: item.feedback || "",
                weakness: item.weakness || "",
                domain: item.domain || ""
            }))

            setSessions(formattedData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Sidebar />

            <div className="ml-64">
                <Navbar />

                <div className="p-8">
                    <div className='mb-10'>
                        <h1 className="mb-2 text-4xl font-bold text-black dark:text-white">
                            Analytics
                        </h1>
                        <p className='text-sm text-slate-600 dark:text-slate-400'>
                            Track your interview performance and coding progress
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-5 mb-10 md:grid-cols-3'>
                        <div className="p-6 bg-white border border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl">
                            <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                                Total Interviews
                            </p>
                            <h2 className='text-3xl font-semibold text-black dark:text-white'>
                                {sessions.length}
                            </h2>
                        </div>

                        <div className='p-6 bg-white border border-slate-900 dark:bg-slate-900 dark:border-slate-800 rounded-2xl'>
                            <p className='mb-3 text-sm text-slate-600 dark:text-slate-400'>
                                Average Score
                            </p>
                            <h2 className='text-3xl font-semibold text-black dark:text-white'>
                                {
                                    sessions.length > 0
                                    ? (
                                        sessions.reduce((a, b) => a + b.score, 0)
                                        / sessions.length
                                    ).toFixed(1)
                                    : 0
                                }
                                <span className='ml-1 text-lg text-slate-400'>
                                    /10
                                </span>
                            </h2>
                        </div>

                        <div className='p-6 bg-white border border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl'>
                            <p className='mb-3 text-sm text-slate-600 dark:text-slate-400'>
                                Best Score
                            </p>
                            <h2 className='text-3xl font-semibold text-blue-600 dark:text-blue-400'>
                                {
                                    sessions.length > 0
                                    ? Math.max(...sessions.map(item => item.score))
                                    : 0
                                }
                                <span className='ml-1 text-lg text-slate-400'>
                                    /10
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className='p-6 bg-white border border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl'>
                         <div className='mb-8'>
                            <h2 className='mb-2 text-xl font-semibold text-black dark:text-white'>
                                Performance Trend
                            </h2>
                            <p className='text-sm text-slate-600 dark:text-slate-400'>
                                Visual overview of your interview scores
                            </p>
                        </div>
                        <div className='w-full h-[350px]'>
                            <ResponsiveContainer  width="100%" height="100%">
                                <LineChart data={sessions}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2.5} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics