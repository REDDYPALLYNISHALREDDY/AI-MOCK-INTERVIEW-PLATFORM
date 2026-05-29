import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import QuestionBox from '../components/QuestionBox'
import { Mic, Timer, ArrowLeft } from 'lucide-react'
import api from '../services/api'
import '../index.css'

function Interview() {

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const domain = searchParams.get('domain')

  const interviewType = searchParams.get('type')

  const currentUser = JSON.parse(localStorage.getItem("user"))

  const userEmail = currentUser?.email

  const personality = localStorage.getItem(`${userEmail}_personality_${domain}`)
    
    if (!userEmail) {

      return (

        <div className='min-h-screen bg-slate-950'>

          <Sidebar />

          <div className='ml-64'>

            <Navbar />

            <div className='flex items-center justify-center min-h-[90vh]'>

              <div className='max-w-2xl p-12 text-center border bg-slate-900 border-slate-800 rounded-2xl'>

                <h1 className='mb-6 text-3xl font-semibold text-white'>
                  Session Expired
                </h1>

                <p className='mb-8 text-base leading-8 text-slate-400'>
                  Please select interview domain again from dashboard.
                </p>

                <button
                  onClick={() => navigate('/dashboard')}
                  className='flex items-center gap-2 px-8 py-4 mx-auto text-sm font-medium text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 rounded-xl'
                >
                  <ArrowLeft />
                  Go To Dashboard

                </button>
              </div>

            </div>

          </div>

        </div>
      )
    }

  const [question, setQuestion] = useState(
    localStorage.getItem(`${userEmail}_question_${domain}`) || ''
  )

  const [resumeQuestions, setResumeQuestions] = useState(
    
    JSON.parse(localStorage.getItem(`${userEmail}_resumeQuestions`)) || "[]"
  )

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [difficulty, setDifficulty] = useState(
    localStorage.getItem(`${userEmail}_difficulty_${domain}`) || "Beginner"
  )

  const [answer, setAnswer] = useState(
    localStorage.getItem(`${userEmail}_answer_${domain}`) || ''
  )

  const [feedback, setFeedback] = useState(
    interviewType === "resume"
      ? localStorage.getItem('resume_feedback') || ''
      : localStorage.getItem(`${userEmail}_feedback_${domain}`) || ''
  )

  const [loading, setLoading] = useState(false)

  const [score, setScore] = useState(
    interviewType === "resume"
      ? localStorage.getItem('resume_score') || ''
      : localStorage.getItem(`${userEmail}_score_${domain}`) || ''
  )

  const [isRecording, setIsRecording] = useState(false)

  const [isSpeaking, setIsSpeaking] = useState(false)

  const [weakness, setWeakness] = useState(
    interviewType === "resume"
      ? localStorage.getItem('resume_weakness') || ''
      : localStorage.getItem(`${userEmail}_weakness_${domain}`) || ''
  )

  const [recognitionInstance, setRecognitionInstance] = useState(null)

  useEffect(() => {

    if (
      interviewType === "resume" &&
      resumeQuestions.length > 0
    ) {

      const savedIndex =
        Number(
          localStorage.getItem(
            "currentResumeQuestionIndex"
          )
        ) || 0

      setCurrentQuestionIndex(savedIndex)

      setQuestion(
        resumeQuestions[savedIndex]
      )

    } else {

      const savedQuestion =
        localStorage.getItem(
          `${userEmail}_question_${domain}`
        )

      if (domain && !savedQuestion) {
        loadFirstQuestion()
      } else {
        setQuestion(savedQuestion)
      }
    }

  }, [])

  useEffect(() => {

    if (question) {
      speakQuestion(question)
    }

  }, [question])

  const loadFirstQuestion = async () => {

    try {

      const response = await api.get(
        `/interview/start?domain=${domain}&difficulty=${difficulty}`
      )

      setQuestion(response.data)

      localStorage.setItem(
        `${userEmail}_question_${domain}`,
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  const handleSubmit = async () => {

    if(answer.trim() === '') {

      alert('Please enter your answer')

      return
    }

    try {

      setLoading(true)

      // RESUME INTERVIEW
      if (interviewType === "resume") {

        const response = await api.post(
          '/interview/evaluate',
          {
            question,
            answer,
            domain: "Resume Interview",
            difficulty,
            userEmail
          }
        )

        console.log(response.data)

        setFeedback(response.data.feedback || '')

        setScore(response.data.score || '0/10')

        setWeakness(response.data.weakness || '')

        localStorage.setItem(
          'resume_feedback',
          response.data.feedback || ''
        )

        localStorage.setItem(
          'resume_score',
          response.data.score || '0/10'
        )

        localStorage.setItem(
          'resume_weakness',
          response.data.weakness || ''
        )

        const nextIndex =
          currentQuestionIndex + 1

        if (nextIndex < resumeQuestions.length) {

          setCurrentQuestionIndex(nextIndex)

          setQuestion(
            resumeQuestions[nextIndex]
          )

          localStorage.setItem(
            "currentResumeQuestionIndex",
            nextIndex
          )

        } else {

          alert("Resume Interview Completed")
        }

        setAnswer('')

        return
      }

      // NORMAL INTERVIEW

      console.log(userEmail)
      
      const response = await api.post(
        '/interview/evaluate',
        {
          question,
          answer,
          domain,
          difficulty,
          userEmail,
          personality
        }
      )

      console.log(response.data)

      setFeedback(response.data.feedback || '')

      localStorage.setItem(
        `${userEmail}_feedback_${domain}`,
        response.data.feedback || ''
      )

      setScore(response.data.score || '0/10')

      localStorage.setItem(
        `${userEmail}_score_${domain}`, 
        response.data.score || '0/10'
      )

      setWeakness(response.data.weakness || '')

      localStorage.setItem(
        `${userEmail}_weakness_${domain}`,
        response.data.weakness || ''
      )

      setDifficulty(
        response.data.nextDifficulty || difficulty
      )

      localStorage.setItem(
        `${userEmail}_difficulty_${domain}`,
        response.data.nextDifficulty || difficulty
      )

      setQuestion(
        response.data.nextQuestion || question
      )

      localStorage.setItem(
        `${userEmail}_question_${domain}`,
        response.data.nextQuestion || question
      )

      setAnswer('')

      localStorage.setItem(
        `${userEmail}_answer_${domain}`,
        ''
      )

    } catch(error) {

      console.log(error)

      alert('Something went wrong')

    } finally {

      setLoading(false)
    }
  }

  const startRecording = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported in this browser"
      )

      return
    }

    const recognition = new SpeechRecognition()

    setRecognitionInstance(recognition)

    recognition.continuous = false

    recognition.interimResults = false

    recognition.lang = "en-US"

    recognition.start()

    setIsRecording(true)

    recognition.onresult = (event) => {

      let finalTranscript = ""

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        const transcript =
          event.results[i][0].transcript

        if (event.results[i].isFinal) {

          finalTranscript += transcript + " "
        }
      }

      if (finalTranscript !== "") {

        setAnswer(
          (prev) => prev + finalTranscript
        )
      }
    }

    recognition.onerror = () => {

      setIsRecording(false)
    }

    recognition.onend = () => {

      setIsRecording(false)
    }
  }

  const stopRecording = () => {

    if (recognitionInstance) {

      recognitionInstance.stop()

      setIsRecording(false)
    }
  }

  const speakQuestion = (text) => {

    window.speechSynthesis.cancel()

    const speech =
      new SpeechSynthesisUtterance(text)

    speech.lang = 'en-US'

    speech.rate = 0.95

    speech.pitch = 1

    speech.volume = 1

    const voices =
      window.speechSynthesis.getVoices()

    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes('Google US English') ||
        voice.name.includes('Samantha')
    )

    if (femaleVoice) {

      speech.voice = femaleVoice
    }

    speech.onstart = () => {

      setIsSpeaking(true)
    }

    speech.onend = () => {

      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(speech)
  }

  if (!domain && interviewType !== "resume") {

    return (

      <div className='min-h-screen bg-white dark:bg-slate-950'>

        <Sidebar />

        <div className='ml-64'>

          <Navbar />

          <div className='flex items-center justify-center min-h-[90vh]'>

            <div className='max-w-2xl p-12 text-center bg-white border dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl'>

              <h1 className='mb-6 text-3xl font-semibold text-black dark:text-white'>
                Select Interview Domain
              </h1>

              <p className='mb-8 text-base leading-8 text-slate-600 dark:text-slate-400'>
                Go to Dashboard and choose your preferred interview domain to start your AI interview session.
              </p>

              <button
                onClick={() => navigate('/dashboard')}
                className='flex items-center gap-2 px-8 py-4 mx-auto text-sm font-medium text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 rounded-xl'
              >

                <ArrowLeft />

                Go To Dashboard

              </button>

            </div>

          </div>

        </div>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-slate-950">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-3xl font-semibold text-white">
                AI Interview Session
              </h1>

              <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
                Domain: {domain || "Resume Interview"}
              </p>

              {
                interviewType !== "resume" && (
                  <>
                    <p className='mt-2 text-sm font-medium text-amber-600 dark:text-amber-400'>
                      Difficulty: {difficulty}
                    </p>

                    <p className='mt-2 text-sm font-medium text-blue-600 dark:text-blue-400'>
                      Personality: {personality}
                    </p>
                  </>
                )
              }
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white border text-amber-60 dark:text-amber-400 dark:bg-slate-900 rounded-xl border-slate-300 dark:border-slate-800">

              <Timer />

              <span className='text-sm font-medium'>
                15:00
              </span>

            </div>

          </div>

          {
            isSpeaking && (

              <div className='flex items-center gap-3 mb-4 text-blue-400 animate-pulse'>

                <div className='w-3 h-3 bg-blue-400 rounded-full'></div>

                <p>AI is speaking...</p>

              </div>
            )
          }

          <QuestionBox question={question} />

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-5 mt-8 text-sm leading-7 text-black bg-white border outline-none resize-none dark:bg-slate-900 border-slate-300 dark:border-slate-800 rounded-2xl dark:text-white h-52"
          ></textarea>

          <div className="flex gap-5 mt-6">

            <button
              onClick={
                isRecording
                ? stopRecording
                : startRecording
              }
              className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white transition-all duration-300 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-xl"
            >

              <Mic />

              {
                isRecording
                ? ' Stop Recording...'
                : 'Start Recording'
              }

            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-3 text-sm font-medium text-white transition-all duration-300 cursor-pointer bg-emerald-600 hover:bg-emerald-700 rounded-xl disabled:opacity-50"
            >

              {
                loading
                ? 'Evaluating...'
                : 'Submit Answer'
              }

            </button>

          </div>

          {
            feedback && (

              <div className="p-6 mt-10 border bg-slate-900 border-slate-800 rounded-2xl">

                <p className='text-sm font-medium text-emerald-400'>
                  Score: {score}
                </p>

                <p className='text-sm font-medium text-amber-400'>
                  Difficulty: {difficulty}
                </p>

                <h2 className='text-xl font-semibold text-black dark:text-white'>
                  AI Feedback
                </h2>

                <div className='space-y-4'>

                  {(feedback.includes("1.")
                    ? feedback.split(/\d+\./)
                    : [feedback])
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => (

                      <div
                        key={index}
                        className='p-5 text-sm leading-7 border bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 rounded-2xl text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
                      >

                        <div className='flex items-start gap-3'>

                          <div className='flex items-center justify-center w-8 h-8 font-bold text-blue-400 rounded-full bg-blue-500/10'>
                            {index + 1}
                          </div>

                          <p className='flex-1'>
                            {item.trim()}
                          </p>

                        </div>

                      </div>

                    ))}
                </div>

                {
                  weakness && (

                    <div className='p-6 mt-6 bg-white border border-red-300 dark:bg-slate-900 dark:border-red-500/20 rounded-2xl'>

                      <h2 className='mb-5 text-xl font-semibold text-red-400'>
                        AI Weakness Detection
                      </h2>

                      <div className='space-y-3'>

                        {(weakness.includes("1.")
                          ? weakness.split(/\d+\./)
                          : [weakness])
                          .filter((item) => item.trim() !== "")
                          .map((item, index) => (

                            <div
                              key={index}
                              className='p-4 text-sm leading-7 text-red-700 border border-red-300 bg-red-50 dark:bg-slate-950 dark:border-red-500/20 rounded-xl dark:text-red-200'
                            >

                              <div className='flex items-start gap-3'>

                                <div className='flex items-center justify-center font-bold text-red-200 rounded-full w-7 h-7 bg-red-500/20'>
                                  !
                                </div>

                                <p>
                                  {item.trim()}
                                </p>

                              </div>

                            </div>

                          ))}
                      </div>

                    </div>
                  )
                }

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Interview