'use client'

import { useState } from 'react'
import { FileText, Download, Eye, Clock, Star } from 'lucide-react'

interface QuestionPapersProps {
  grade: number
}

export default function QuestionPapers({ grade }: QuestionPapersProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']

  const papers = [
    {
      title: 'Mid-Term Examination 2024',
      year: 2024,
      term: 'Mid-Term',
      marks: 100,
      duration: '3 hours',
      difficulty: 'Medium',
      downloads: 234
    },
    {
      title: 'Final Examination 2023',
      year: 2023,
      term: 'Final',
      marks: 100,
      duration: '3 hours',
      difficulty: 'Hard',
      downloads: 456
    },
    {
      title: 'Practice Paper Set 1',
      year: 2024,
      term: 'Practice',
      marks: 80,
      duration: '2 hours',
      difficulty: 'Easy',
      downloads: 189
    },
    {
      title: 'Monthly Test March 2024',
      year: 2024,
      term: 'Monthly',
      marks: 50,
      duration: '1.5 hours',
      difficulty: 'Medium',
      downloads: 167
    },
    {
      title: 'Sample Paper 2024',
      year: 2024,
      term: 'Sample',
      marks: 100,
      duration: '3 hours',
      difficulty: 'Medium',
      downloads: 398
    },
    {
      title: 'Pre-Board Examination 2024',
      year: 2024,
      term: 'Pre-Board',
      marks: 100,
      duration: '3 hours',
      difficulty: 'Hard',
      downloads: 512
    },
  ]

  if (selectedSubject) {
    return (
      <div className="space-y-6">
        <div className="glass-effect rounded-2xl p-6 shadow-xl">
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-4 text-telegram-blue hover:text-telegram-darkblue font-medium"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedSubject}</h2>
          <p className="text-gray-600">Grade {grade} - Question Papers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {papers.map((paper, index) => (
            <div key={index} className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{paper.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-telegram-blue/10 text-telegram-blue rounded-full text-sm font-medium">
                      {paper.year}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {paper.term}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      paper.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      paper.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {paper.difficulty}
                    </span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-telegram-blue/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-telegram-blue" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-4 h-4" />
                  <span>{paper.marks} Marks</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{paper.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Download className="w-4 h-4" />
                  <span>{paper.downloads} downloads</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>PDF Format</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 telegram-gradient text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Paper
                </button>
                <button className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors">
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Generated Practice Papers</h3>
          <p className="text-gray-600 mb-4">
            Generate custom question papers based on specific topics and difficulty levels using our AI.
          </p>
          <button className="telegram-gradient text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
            Generate Custom Paper with AI
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FileText className="text-telegram-blue" />
        Question Papers - Select Subject
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
            <div className="text-sm text-white/80 mb-3">
              {Math.floor(Math.random() * 30) + 15} papers available
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-white/20 rounded">Past Papers</span>
              <span className="px-2 py-1 bg-white/20 rounded">Sample Papers</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
        <h3 className="text-2xl font-bold mb-2">✨ AI-Powered Paper Generation</h3>
        <p className="text-white/90">
          Use our advanced AI to generate custom question papers tailored to your needs, including topic selection,
          difficulty adjustment, and format customization.
        </p>
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
