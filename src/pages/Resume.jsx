import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../services/api";
import '../index.css'

function Resume() {

    const currentUser = JSON.parse(localStorage.getItem("user"))

    const userEmail = currentUser?.email || "guest"

    const [file, setFile] = useState(null)

    const [loading, setLoading] = useState(false)

    const [result, setResult] = useState(localStorage.getItem(`${userEmail}_resumeFeedback`) || "")



    const handleUpload = async () => {

        if (!file) {

            alert("Please upload resume")

            return
        }

        localStorage.removeItem(`${userEmail}_resumeFeedback`)

        try {

            setLoading(true)

            setResult("")

            const formData = new FormData()

            formData.append("resume", file)
            formData.append("domain", "Java")
            formData.append("difficulty", "Medium")

            const response =
                await api.post(
                    "/resume/analyze",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

            console.log(response.data)

            if (response.data) {

                setResult(response.data)

                const extractedQuestions = response.data.split("INTERVIEW QUESTIONS:")[1]

                if (extractedQuestions) {
                    const questionArray = extractedQuestions.split(/\d+\./).filter((q) => q.trim() !== "")

                    localStorage.setItem(`${userEmail}_resumeQuestions`, JSON.stringify(questionArray))
                }

                localStorage.setItem(`${userEmail}_resumeFeedback`, response.data)

            } else {

                setResult("No feedback received")
            }

        } catch (error) {

            console.log(error)

            if (error.response) {

                console.log(error.response.data)

                setResult("Backend error occurred")

            } else if (error.request) {

                setResult("No response from backend")

            } else {

                setResult("Resume analysis failed")
            }

        } finally {

            setLoading(false)
        }
    }

    return (

        <div className="min-h-screen bg-white dark:bg-slate-950">

            <Sidebar />

            <div className="min-h-screen ml-64">

                <Navbar />

                <div className="p-8">

                    <h1 className="mb-2 text-3xl font-semibold text-black dark:text-white">
                        Resume Analyzer
                    </h1>

                    <p className="mb-10 text-sm text-slate-600 dark:text-slate-400">
                        Upload your resume in PDF or DOCX format to receive 
                        AI-Powered ATS analysis, interview feedback, and personalized inteview questions.
                    </p>

                    <div className="p-6 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl">

                        <h2 className="mb-5 text-xl font-semibold text-black dark:text-white">
                            Upload Resume
                        </h2>

                        <div className="flex flex-col gap-4 mb-6">

                            <label
                                htmlFor="resumeUpload"
                                className="px-5 py-3 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer w-fit hover:bg-blue-700"
                            >
                                Choose Resume
                            </label>

                            <input
                                id="resumeUpload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="hidden"
                            />

                            {
                                file && (
                                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                                        Selected File: {file.name}
                                    </p>
                                )
                            }

                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="px-5 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700"
                        >
                            {
                                loading
                                    ? "Analyzing..."
                                    : "Analyze Resume"
                            }
                        </button>

                    </div>

                    {
                        result && (

                            <div className="p-6 mt-8 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl">

                                <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white">
                                    AI Resume Feedback
                                </h2>

                                <div className="text-sm leading-7 whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                                    {result}
                                </div>

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default Resume