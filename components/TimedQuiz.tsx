'use client'

import { useState, useEffect } from 'react'
import { Timer, CheckCircle, XCircle } from 'lucide-react'

interface TimedQuizProps {
  subject: string
  grade: number
  onExit: () => void
}

export default function TimedQuiz({ subject, grade, onExit }: TimedQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const questions = generateQuestions(subject, grade)

  useEffect(() => {
    if (submitted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setSubmitted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [submitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++
    })
    return Math.round((correct / questions.length) * 100)
  }

  if (submitted) {
    const score = calculateScore()
    return (
      <div className="glass-effect rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
            score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            <span className="text-5xl font-bold text-white">{score}%</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored {score}% on {subject}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-600">
                {Object.values(answers).filter((a, i) => a === questions[i].correct).length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-red-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-red-600">
                {questions.length - Object.values(answers).filter((a, i) => a === questions[i].correct).length}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="bg-blue-100 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-600">
                {formatTime(1800 - timeLeft)}
              </div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-left">
            <h3 className="text-xl font-bold text-gray-800">Review Answers:</h3>
            {questions.map((q, index) => (
              <div key={index} className={`p-4 rounded-xl ${
                answers[index] === q.correct ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex items-start gap-2 mb-2">
                  {answers[index] === q.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 mb-2">Q{index + 1}. {q.question}</div>
                    <div className="text-sm">
                      <div className={answers[index] === q.correct ? 'text-green-700' : 'text-red-700'}>
                        Your answer: {answers[index] || 'Not answered'}
                      </div>
                      {answers[index] !== q.correct && (
                        <div className="text-green-700">Correct answer: {q.correct}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onExit}
            className="px-8 py-4 telegram-gradient text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="glass-effect rounded-2xl p-8 shadow-xl">
      {/* Timer Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{subject} - Timed Quiz</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xl ${
          timeLeft < 300 ? 'bg-red-500 text-white animate-pulse' : 'bg-telegram-blue text-white'
        }`}>
          <Timer className="w-6 h-6" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="telegram-gradient h-3 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`p-4 rounded-xl text-left transition-all ${
                answers[currentQuestion] === option
                  ? 'telegram-gradient text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                answers[index] ? 'bg-green-500' : index === currentQuestion ? 'bg-telegram-blue' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            className="px-6 py-3 telegram-gradient text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

function generateQuestions(subject: string, grade: number) {
  const questionBank: { [key: string]: any[] } = {
    Mathematics: [
      { question: 'What is the derivative of x²?', options: ['2x', 'x', '2', 'x²'], correct: '2x' },
      { question: 'Solve: 2x + 5 = 15', options: ['5', '10', '7.5', '20'], correct: '5' },
      { question: 'What is sin(90°)?', options: ['0', '1', '-1', '0.5'], correct: '1' },
      { question: 'Find the area of a circle with radius 5', options: ['25π', '10π', '50π', '5π'], correct: '25π' },
      { question: 'What is the value of π (approximately)?', options: ['3.14', '2.71', '1.41', '1.73'], correct: '3.14' },
    ],
    Physics: [
      { question: 'What is the SI unit of force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 'Newton' },
      { question: 'Speed of light in vacuum?', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁹ m/s', '3×10⁷ m/s'], correct: '3×10⁸ m/s' },
      { question: 'Formula for kinetic energy?', options: ['½mv²', 'mv²', 'mgh', '½mgh'], correct: '½mv²' },
      { question: "Newton's first law is also called?", options: ['Law of inertia', 'Law of motion', 'Law of gravity', 'Law of energy'], correct: 'Law of inertia' },
      { question: 'What is the acceleration due to gravity?', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'], correct: '9.8 m/s²' },
    ],
    Chemistry: [
      { question: 'What is the atomic number of Carbon?', options: ['6', '8', '12', '14'], correct: '6' },
      { question: 'Chemical formula for water?', options: ['H₂O', 'CO₂', 'O₂', 'H₂O₂'], correct: 'H₂O' },
      { question: 'pH of pure water?', options: ['7', '0', '14', '1'], correct: '7' },
      { question: 'What is the most abundant gas in atmosphere?', options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Argon'], correct: 'Nitrogen' },
      { question: 'Symbol for Gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], correct: 'Au' },
    ],
    Biology: [
      { question: 'What is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'], correct: 'Mitochondria' },
      { question: 'DNA stands for?', options: ['Deoxyribonucleic acid', 'Diribonucleic acid', 'Deoxyribose acid', 'Dinucleic acid'], correct: 'Deoxyribonucleic acid' },
      { question: 'How many chambers in human heart?', options: ['4', '2', '3', '6'], correct: '4' },
      { question: 'Process of photosynthesis occurs in?', options: ['Chloroplast', 'Mitochondria', 'Nucleus', 'Ribosome'], correct: 'Chloroplast' },
      { question: 'Largest organ in human body?', options: ['Skin', 'Liver', 'Brain', 'Heart'], correct: 'Skin' },
    ],
    English: [
      { question: 'What is a noun?', options: ['Person, place, or thing', 'Action word', 'Describing word', 'Connecting word'], correct: 'Person, place, or thing' },
      { question: 'Synonym of "happy"?', options: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 'Joyful' },
      { question: 'Past tense of "run"?', options: ['Ran', 'Runned', 'Running', 'Runs'], correct: 'Ran' },
      { question: 'What is an adjective?', options: ['Describing word', 'Action word', 'Person or place', 'Connecting word'], correct: 'Describing word' },
      { question: 'Which is correct?', options: ['She is going', 'She are going', 'She am going', 'She be going'], correct: 'She is going' },
    ],
    'Computer Science': [
      { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Management Language'], correct: 'HyperText Markup Language' },
      { question: 'Which is a programming language?', options: ['Python', 'Eagle', 'Lion', 'Tiger'], correct: 'Python' },
      { question: 'What is CPU?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Utility'], correct: 'Central Processing Unit' },
      { question: 'Binary digit?', options: ['Bit', 'Byte', 'Nibble', 'Word'], correct: 'Bit' },
      { question: '1 GB equals?', options: ['1024 MB', '1000 MB', '512 MB', '2048 MB'], correct: '1024 MB' },
    ],
  }

  const baseQuestions = questionBank[subject] || questionBank.Mathematics

  // Generate 20 questions by repeating and shuffling
  const allQuestions = []
  for (let i = 0; i < 4; i++) {
    allQuestions.push(...baseQuestions)
  }

  return allQuestions.slice(0, 20).sort(() => Math.random() - 0.5)
}
