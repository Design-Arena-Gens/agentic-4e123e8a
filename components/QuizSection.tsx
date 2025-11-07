'use client'

import { useState } from 'react'
import { Clock, PlayCircle, CheckCircle, Timer } from 'lucide-react'
import TimedQuiz from '@/components/TimedQuiz'
import NormalQuiz from '@/components/NormalQuiz'

interface QuizSectionProps {
  grade: number
}

export default function QuizSection({ grade }: QuizSectionProps) {
  const [quizType, setQuizType] = useState<'timed' | 'normal' | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']

  if (quizType && selectedSubject) {
    if (quizType === 'timed') {
      return <TimedQuiz subject={selectedSubject} grade={grade} onExit={() => setQuizType(null)} />
    } else {
      return <NormalQuiz subject={selectedSubject} grade={grade} onExit={() => setQuizType(null)} />
    }
  }

  if (selectedSubject) {
    return (
      <div className="glass-effect rounded-2xl p-8 shadow-xl">
        <button
          onClick={() => setSelectedSubject(null)}
          className="mb-6 text-telegram-blue hover:text-telegram-darkblue font-medium"
        >
          ← Back to Subjects
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {selectedSubject} - Choose Quiz Type
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timed Quiz */}
          <div
            onClick={() => setQuizType('timed')}
            className="group cursor-pointer bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Timer className="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Timed Quiz</h3>
            <p className="text-white/90 text-center mb-6">
              Test your speed and accuracy with time-limited questions
            </p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>✓ 20 questions in 30 minutes</li>
              <li>✓ Countdown timer</li>
              <li>✓ Auto-submit when time expires</li>
              <li>✓ Instant scoring</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <div className="px-6 py-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                Start Timed Quiz →
              </div>
            </div>
          </div>

          {/* Normal Quiz */}
          <div
            onClick={() => setQuizType('normal')}
            className="group cursor-pointer bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <PlayCircle className="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Normal Quiz</h3>
            <p className="text-white/90 text-center mb-6">
              Practice at your own pace without time pressure
            </p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>✓ 20 questions, no time limit</li>
              <li>✓ Take your time to think</li>
              <li>✓ Submit when ready</li>
              <li>✓ Detailed explanations</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <div className="px-6 py-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                Start Normal Quiz →
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Clock className="text-telegram-blue" />
        Select a Subject for Quiz
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
            onClick={() => setSelectedSubject(subject)}
            className="group cursor-pointer bg-gradient-to-br from-telegram-blue to-telegram-darkblue rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-4xl mb-4">{getSubjectIcon(subject)}</div>
            <h3 className="text-xl font-bold mb-2">{subject}</h3>
            <div className="flex gap-2 text-sm mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full">Timed</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">Normal</span>
            </div>
            <div className="text-sm text-white/80">
              {Math.floor(Math.random() * 50) + 20} quizzes available
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getSubjectIcon(subject: string) {
  const icons: { [key: string]: string } = {
    Mathematics: '📐',
    Physics: '⚡',
    Chemistry: '⚗️',
    Biology: '🧬',
    English: '📚',
    'Computer Science': '💻',
  }
  return icons[subject] || '📖'
}
