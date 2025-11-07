'use client'

import { Send } from 'lucide-react'

interface GradeSelectorProps {
  onSelectGrade: (grade: number) => void
}

export default function GradeSelector({ onSelectGrade }: GradeSelectorProps) {
  const grades = [9, 10, 11, 12]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-12 shadow-2xl max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 telegram-gradient rounded-full flex items-center justify-center">
              <Send className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Telegram Board</h1>
          <p className="text-xl text-gray-600">AI-Powered Educational Platform</p>
          <p className="text-gray-500 mt-2">Select your grade to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => onSelectGrade(grade)}
              className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
            >
              <div className="relative z-10">
                <div className="text-6xl font-bold text-white mb-2">{grade}</div>
                <div className="text-xl text-white/90">Grade {grade}</div>
              </div>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Timed Quizzes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Normal Quizzes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Question Papers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>AI Assistant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
