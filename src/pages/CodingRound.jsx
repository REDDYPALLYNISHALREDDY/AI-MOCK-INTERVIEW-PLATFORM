import { useEffect, useState } from 'react'

import Editor from '@monaco-editor/react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { User } from 'lucide-react'
import '../index.css'

function CodingRound() {

    const currentUser =
        JSON.parse(localStorage.getItem("user"))

    const userEmail =
        currentUser?.email

    const [language, setLanguage] =
        useState('java')

    const [programOutput, setProgramOutput] =
        useState('')

    const [feedback, setFeedback] =
        useState('')

    const [code, setCode] =
        useState('')

    const [loading, setLoading] =
        useState(false)

    const [question, setQuestion] =
        useState('')

    const codingStarted = localStorage.getItem(`${userEmail}_codingStarted`)

    useEffect(() => {

        if (codingStarted) {
            generateQuestion(language)
        }

    }, [])

    const generateQuestion = async (
        selectedLanguage = language
    ) => {

        try {

            const savedQuestion =
                localStorage.getItem(
                    `${userEmail}_coding_question_${selectedLanguage}`
                )
            const savedCode = localStorage.getItem(
                `${userEmail}_coding_code_${selectedLanguage}`
            )

            const savedOutput = localStorage.getItem(
                `${userEmail}_coding_output_${selectedLanguage}`
            )

            const savedFeedback = localStorage.getItem(
                `${userEmail}_coding_feedback_${selectedLanguage}`
            )

            if (savedQuestion) {
                setQuestion(savedQuestion)
            }

            if (savedCode) {
                setCode(savedCode)
            }

            if (savedOutput) {
                setProgramOutput(savedOutput)
            }

            if (savedFeedback) {
                setFeedback(savedFeedback)
            }

            const response = await api.get(
                `/coding/question?language=${selectedLanguage}&difficulty=Medium`
            )

            setQuestion(response.data.question)

            localStorage.setItem(
                `${userEmail}_coding_question_${selectedLanguage}`,
                response.data.question
            )

        } catch (error) {

            console.log(error)

            setQuestion(
                "Failed to generate question"
            )
        }
    }

    const runCode = async () => {

        setLoading(true)

        try {

            const response = await api.post(
                '/coding/evaluate',
                {
                    language,
                    question,
                    code,
                    userEmail
                }
            )

            setProgramOutput(
                response.data.output
            )

            localStorage.setItem(`${userEmail}_coding_output_${language}`, response.data.output)

            setFeedback(
                response.data.feedback
            )

            localStorage.setItem(`${userEmail}_coding_feedback_${language}`, response.data.feedback)

        } catch (error) {

            console.log(error)

            setProgramOutput(
                'Backend Error'
            )

            setFeedback(
                'AI Feedback Failed'
            )

        } finally {

            setLoading(false)
        }
    }

    function handleEditorWillMount(
        monaco
    ) {

        monaco.editor.defineTheme(
            'interviewAITheme',
            {

                base: 'vs-dark',

                inherit: true,

                rules: [],

                colors: {

                    'editor.background':
                        '#020617',

                    'editor.foreground':
                        '#ffffff',

                    'editorLineNumber.foreground':
                        '#64748b',

                    'editorCursor.foreground':
                        '#22d3ee',

                    'editor.lineHighlightBackground':
                        '#0f172a',

                    'editorLineNumber.activeForeground':
                        '#22d3ee',

                    'editor.selectionBackground':
                        '#164e63',

                    'editor.inactiveSelectionBackground':
                        '#082f49',

                    'editorIndentGuide.background':
                        '#1e293b',

                    'editorIndentGuide.activeBackground':
                        '#334155'
                }
            }
        )
    }

    if (!codingStarted) {

        return (

            <div className='min-h-screen bg-white dark:bg-slate-950'>

                <Sidebar />

                <div className='min-h-screen ml-64'>

                    <Navbar />

                    <div className='flex items-center justify-center h-[90vh]'>

                        <div className='bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-10 rounded-2xl text-center w-[620px]'>

                            <h1 className='mb-4 text-3xl font-semibold text-black dark:text-white'>
                                Start Coding Round
                            </h1>

                            <p className='mb-8 text-base leading-8 text-slate-600 dark:text-slate-400'>
                                Click below to begin your AI coding session.
                            </p>

                            <button

                                onClick={() => {

                                    localStorage.setItem(
                                        `${userEmail}_codingStarted`,
                                        "true"
                                    )

                                    window.location.reload()

                                }}

                                className='px-8 py-3 text-sm font-medium text-white transition-all duration-300 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-xl'
                            >

                                Start Coding

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )
    }

    return (

        <div className='min-h-screen bg-white dark:bg-slate-950'>

            <Sidebar />

            <div className='min-h-screen ml-64'>

                <Navbar />

                <div className='p-8'>

                    <div className='flex items-center justify-between mb-8'>

                        <div>

                            <h1 className='mb-2 text-3xl font-semibold text-black dark:text-white'>
                                AI Coding Round
                            </h1>

                            <p className='text-sm text-slate-400'>
                                Solve coding problems with AI evaluation
                            </p>

                        </div>

                        <div className='px-5 py-3 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-xl'>

                            <p className='text-lg font-semibold text-blue-400'>
                                45:00
                            </p>

                        </div>

                    </div>

                    {/* QUESTION PANEL */}

                    <div className='p-6 mb-8 bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'>

                        <h2 className='mb-5 text-xl font-semibold text-black dark:text-white'>
                            Coding Question
                        </h2>

                        <pre className='text-sm leading-8 whitespace-pre-wrap text-slate-700 dark:text-slate-300'>
                            {question}
                        </pre>

                    </div>

                    {/* LANGUAGE */}

                    <div className='mb-5'>

                        <select
                            value={language}
                            onChange={(e) => {

                                const selectedLanguage =
                                    e.target.value

                                setLanguage(
                                    selectedLanguage
                                )

                                generateQuestion(
                                    selectedLanguage
                                )
                            }}
                            className='px-4 py-3 text-sm text-black bg-white border outline-none dark:bg-slate-900 border-slate-300 dark:border-slate-800 dark:text-slate-200 rounded-xl'
                        >

                            <option value="java">
                                Java
                            </option>

                            <option value="python">
                                Python
                            </option>

                            <option value="c">
                                C
                            </option>

                            <option value="cpp">
                                C++
                            </option>

                            <option value="javascript">
                                JavaScript
                            </option>

                        </select>

                        <button
                            onClick={() => {

                                localStorage.removeItem(
                                    `${userEmail}_coding_question_${language}`
                                )

                                generateQuestion()

                            }}
                            className='px-5 py-3 ml-4 text-sm font-medium text-black transition-all duration-300 cursor-pointer bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 dark:text-white rounded-xl'
                        >

                            Generate New Question

                        </button>

                    </div>

                    <div className='grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2'>

                        {/* LEFT SIDE */}

                        <div className='flex flex-col overflow-hidden bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'>

                            <div className='flex items-center justify-between px-6 py-4 border-b border-slate-300 dark:border-slate-800'>

                                <h2 className='text-lg font-semibold text-black dark:text-white'>
                                    Code Editor
                                </h2>

                                <button
                                    onClick={runCode}
                                    disabled={loading}
                                    className='px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700'
                                >

                                    {
                                        loading
                                            ? 'Executing...'
                                            : 'Run Code'
                                    }

                                </button>

                            </div>

                            <Editor
                                height="600px"
                                language={language}
                                theme="interviewAITheme"
                                beforeMount={handleEditorWillMount}
                                value={code}
                                onChange={(value) => {
                                    setCode(value)

                                    localStorage.setItem(`${userEmail}_coding_code_${language}`, value || '')
                                }}
                                options={{
                                    fontSize: 18,
                                    minimap: {
                                        enabled: false
                                    },
                                    scrollBeyondLastLine: false,
                                    smoothScrolling: true,
                                    wordWrap: 'on',
                                    padding: {
                                        top: 20
                                    },
                                    fontFamily:
                                        'Fira Code, monospace',
                                }}
                            />

                        </div>

                        {/* RIGHT SIDE */}

                        <div className='flex flex-col gap-6'>

                            {/* PROGRAM OUTPUT */}

                            <div className='overflow-hidden bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'>

                                <div className='px-6 py-4 border-b border-slate-300 dark:border-slate-800'>

                                    <h2 className='text-lg font-semibold text-black dark:text-white'>
                                        Program Output
                                    </h2>

                                </div>

                                <div className='p-6 min-h-[250px]'>

                                    <pre className='text-sm leading-8 whitespace-pre-wrap text-emerald-600 dark:text-emerald-400'>

                                        {
                                            programOutput ||
                                            'Program output will appear here...'
                                        }

                                    </pre>

                                </div>

                            </div>

                            {/* AI FEEDBACK */}

                            <div className='overflow-hidden bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-3xl'>

                                <div className='px-6 py-4 border-b border-slate-300 dark:border-slate-800'>

                                    <h2 className='text-xl font-bold text-black dark:text-white'>
                                        AI Feedback
                                    </h2>

                                </div>

                                <div className='p-6 min-h-[250px]'>

                                    <pre className='text-sm leading-8 whitespace-pre-wrap text-slate-700 dark:text-slate-300'>

                                        {
                                            feedback ||
                                            'AI feedback will appear here...'
                                        }

                                    </pre>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CodingRound