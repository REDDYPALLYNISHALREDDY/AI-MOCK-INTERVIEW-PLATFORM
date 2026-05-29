import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import '../index.css'

function Dashboard() {

    const navigate = useNavigate()

    const [selectedDifficulties, setSelectedDifficulties] = useState({})

    const personalities = [
        "Friendly HR",
        "FAANG Bar Raiser",
        "Startup Founder",
        "Rapid Fire",
        "Silent Interviewer",
        "Supportive Mentor",
        "Aggressive Senior Developer"
    ]

    const domains = [
        {
            title: 'Java Programming',
            description: 'Core Java interview preparation',
            level: 'Medium',
            domain: 'Java',
        },
        {
            title: 'C Programming',
            description: 'C interview preparation',
            level: 'Easy',
            domain: 'C programming',
        },
        {
            title: 'Python Programming',
            description: 'Python interview Preparation',
            level: 'Easy',
            domain: 'Python',
        },
        {
            title: 'C++ Programming',
            description: 'C++ interview preparation',
            level: 'Medium',
            domain: 'C plus plus programming',
        },
        {
            title: 'DSA Interview',
            description: 'Coding and DSA interview',
            level: 'Hard',
            domain: 'DSA',
        },
        {
            title: 'SQL Interview',
            description: 'Database interview preparation',
            level: 'Medium',
            domain: 'SQL',
        },
        {
            title: 'MongoDB Interview',
            description: 'NoSQL database interview preparation',
            level: 'Easy',
            domain: 'MongoDB',
        },
        {
            title: 'React Interview',
            description: 'Frontend React concepts',
            level: 'Medium',
            domain: 'React',
        },
        {
            title: 'Spring Boot Interview',
            description: 'Backend API development',
            level: 'Medium',
            domain: 'Spring Boot',
        },
        {
            title: 'JavaScript Interview',
            description: 'JavaScript fundamentals',
            level: 'Easy',
            domain: 'JavaScript',
        },
        {
            title: 'DBMS Interview',
            description: 'Database management systems',
            level: 'Easy',
            domain: 'DBMS',
        },
        {
            title: 'Operating Systems',
            description: 'OS interview concepts',
            level: 'Easy',
            domain: 'Operating Systems',
        },
        {
            title: 'Computer Networks',
            description: 'Networking interview questions',
            level: 'Easy',
            domain: 'Computer Networks',
        },
        {
            title: 'System Design',
            description: 'System architecture basics',
            level: 'Hard',
            domain: 'System Design',
        },
        {
            title: 'HR Interview',
            description: 'Behavioral interview questions',
            level: 'Easy',
            domain: 'HR',
        },
        {
            title: 'General Aptitude',
            description: 'Logical and aptitude preparation',
            level: 'Easy',
            domain: 'General Aptitude',
        }
    ]

    const startInterview = (domain, level) => {

        const currentUser = JSON.parse(localStorage.getItem("user"))

        const userEmail = currentUser?.email

        if (!userEmail) {
            navigate('/dashboard')
        }

        localStorage.setItem(`${userEmail}_selectedDomain`, domain)

        const savedPersonality = localStorage.getItem(`${userEmail}_personality_${domain}`) || "Friendly HR"

        localStorage.setItem(`${userEmail}_personality_${domain}`, savedPersonality)

        let backendDifficulty = "Beginner"

        if (level === "Medium") {
            backendDifficulty = "Intermediate"
        }

        if (level === "Hard") {
            backendDifficulty = "Advanced"
        }

        localStorage.setItem(`${userEmail}_selectedDifficulty`, backendDifficulty)

        navigate(`/interview?domain=${domain}`)
    }

    return (

        <div className="min-h-screen bg-white dark:bg-slate-950">

            <Sidebar />

            <div className="min-h-screen ml-64">

                <Navbar />

                <div className="p-8">

                    <h1 className="mb-2 text-3xl font-semibold text-black dark:text-white">
                        Dashboard
                    </h1>

                    <p className="mb-10 text-sm text-slate-400">
                        Prepare for your next interview with AI
                    </p>

                    <h2 className="mb-6 text-2xl font-semibold text-white">
                        Resume Analyzer and Interview
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div
                            className="p-6 transition-all duration-300 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl hover:border-slate-400 dark:hover:border-slate-700"
                        >

                            <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                Resume Analyzer
                            </h2>

                            <p className="mb-6 text-sm leading-7 text-slate-400">
                                AI Resume analysis and ATS feedback
                            </p>

                            <div className="flex justify-end mt-6">

                                <button
                                    onClick={() => navigate('/resume')}
                                    className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                        <div
                            className="p-6 transition-all duration-300 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl hover:border-slate-400 dark:hover:border-slate-700"
                        >

                            <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                Resume Based Interview
                            </h2>

                            <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                AI Interview from your resume
                            </p>

                            <div className="flex justify-end mt-6">

                                <button
                                    onClick={() => navigate('/interview?type=resume')}
                                    className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
                                >
                                    Start
                                </button>

                            </div>

                        </div>

                    </div>

                    <h2 className="mb-6 text-3xl font-bold text-black dark:text-white mt-14">
                        Technical Interview Domains
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {
                            domains.map((item, index) => (

                                <div
                                    key={index}
                                    className="p-6 transition-all duration-300 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl hover:border-slate-400 dark:hover:border-slate-700"
                                >

                                    <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                        {item.title}
                                    </h2>

                                    <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 mt-6">

                                        <select
                                            id={`difficulty-${index}`}
                                            className="px-4 py-2 text-sm text-black bg-white border rounded-lg outline-none dark:bg-slate-800 border-slate-300 dark:border-slate-700 dark:text-slate-200"
                                            value={
                                                selectedDifficulties[item.domain]
                                                ??
                                                localStorage.getItem(
                                                    `${JSON.parse(localStorage.getItem("user"))?.email}_difficulty_${item.domain}`
                                                )
                                                ??
                                                item.level
                                            }
                                            onChange={(e) => {

                                                const value = e.target.value

                                                setSelectedDifficulties((prev) => ({
                                                    ...prev,
                                                    [item.domain]: value
                                                }))

                                                const currentUser =
                                                    JSON.parse(localStorage.getItem("user"))

                                                const userEmail = currentUser?.email

                                                if (!userEmail) {
                                                    navigate('/dashboard')
                                                }

                                                localStorage.setItem(
                                                    `${userEmail}_difficulty_${item.domain}`,
                                                    value
                                                )
                                            }}
                                        >

                                            <option value="Easy">
                                                Easy
                                            </option>

                                            <option value="Medium">
                                                Medium
                                            </option>

                                            <option value="Hard">
                                                Hard
                                            </option>

                                        </select>

                                        <select
                                            className="px-4 py-2 text-blue-600 bg-white border outline-none dark:bg-slate-800 border-slate-300 dark:border-slate-700 dark:text-cyan-400 rounded-xl"
                                            onChange={(e) => {
                                                const currentUser = JSON.parse(localStorage.getItem("user"))
                                                const userEmail = currentUser?.email

                                                if (!userEmail) {
                                                    navigate('/dashboard')
                                                }

                                                const selectedPersonality = e.target.value 

                                                localStorage.setItem(`${userEmail}_personality_${item.domain}`, selectedPersonality)
                                            }}
                                            value={localStorage.getItem(`${JSON.parse(localStorage.getItem("user"))?.email}_personality_${item.domain}`) || "Friendly HR"}
                                        >
                                            <option value="Friendly HR">
                                                Friendly HR
                                            </option>
                                            <option value="FAANG Bar Raiser">
                                                FAANG Bar Raiser
                                            </option>
                                            <option value="Startup Founder">
                                                Startup Founder
                                            </option>
                                            <option value="Rapid Fire">
                                                Rapid Fire
                                            </option>
                                            <option value="Silent Interviewer">
                                                Silent Interviewer
                                            </option>
                                            <option value="Supportive Mentor">
                                                Supportive Mentor
                                            </option>
                                        </select>

                                        <button
                                            onClick={() => {

                                                const currentUser =
                                                    JSON.parse(localStorage.getItem("user"))

                                                const userEmail = currentUser?.email

                                                const selectedDifficulty =
                                                    selectedDifficulties[item.domain]
                                                    ??
                                                    localStorage.getItem(
                                                        `${userEmail}_difficulty_${item.domain}`
                                                    )
                                                    ??
                                                    item.level

                                                startInterview(
                                                    item.domain,
                                                    selectedDifficulty
                                                )
                                            }}
                                            className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
                                        >
                                            Start
                                        </button>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard