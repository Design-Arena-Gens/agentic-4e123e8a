'use client'

import { useState } from 'react'
import { BookOpen, Clock, FileText, Brain, Award, Send } from 'lucide-react'
import GradeSelector from '@/components/GradeSelector'
import Dashboard from '@/components/Dashboard'
import QuizSection from '@/components/QuizSection'
import QuestionPapers from '@/components/QuestionPapers'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>('dashboard')

  if (!selectedGrade) {
    return <GradeSelector onSelectGrade={setSelectedGrade} />
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="glass-effect rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 telegram-gradient rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Telegram Board</h1>
                <p className="text-gray-600">Grade {selectedGrade} - AI-Powered Learning</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedGrade(null)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Change Grade
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="glass-effect rounded-2xl p-4 mb-6 shadow-2xl">
          <div className="flex flex-wrap gap-3">
            <NavButton
              icon={<BookOpen />}
              label="Dashboard"
              active={activeSection === 'dashboard'}
              onClick={() => setActiveSection('dashboard')}
            />
            <NavButton
              icon={<Clock />}
              label="Quizzes"
              active={activeSection === 'quizzes'}
              onClick={() => setActiveSection('quizzes')}
            />
            <NavButton
              icon={<FileText />}
              label="Question Papers"
              active={activeSection === 'papers'}
              onClick={() => setActiveSection('papers')}
            />
            <NavButton
              icon={<Brain />}
              label="AI Assistant"
              active={activeSection === 'ai'}
              onClick={() => setActiveSection('ai')}
            />
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {activeSection === 'dashboard' && <Dashboard grade={selectedGrade} />}
          {activeSection === 'quizzes' && <QuizSection grade={selectedGrade} />}
          {activeSection === 'papers' && <QuestionPapers grade={selectedGrade} />}
          {activeSection === 'ai' && <AIAssistant grade={selectedGrade} />}
        </main>
      </div>
    </div>
  )
}

function NavButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium ${
        active
          ? 'telegram-gradient text-white shadow-lg scale-105'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
