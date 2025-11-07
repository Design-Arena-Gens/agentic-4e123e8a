'use client'

import { Trophy, Clock, FileCheck, Brain, TrendingUp, Target } from 'lucide-react'

interface DashboardProps {
  grade: number
}

export default function Dashboard({ grade }: DashboardProps) {
  const stats = [
    { icon: <Trophy />, label: 'Quizzes Completed', value: '24', color: 'bg-yellow-500' },
    { icon: <Target />, label: 'Average Score', value: '87%', color: 'bg-green-500' },
    { icon: <Clock />, label: 'Study Hours', value: '45h', color: 'bg-blue-500' },
    { icon: <FileCheck />, label: 'Papers Solved', value: '12', color: 'bg-purple-500' },
  ]

  const recentActivity = [
    { subject: 'Mathematics', action: 'Completed Timed Quiz', score: 95, time: '2 hours ago' },
    { subject: 'Physics', action: 'Solved Question Paper', score: 88, time: '5 hours ago' },
    { subject: 'Chemistry', action: 'Normal Quiz', score: 92, time: '1 day ago' },
    { subject: 'Biology', action: 'AI Practice Session', score: 85, time: '2 days ago' },
  ]

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-effect rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subjects Grid */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Brain className="text-telegram-blue" />
          Your Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-telegram-blue to-telegram-darkblue rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2">{subject}</h3>
              <div className="flex justify-between items-center text-sm">
                <span>{Math.floor(Math.random() * 30) + 10} Quizzes</span>
                <span>{Math.floor(Math.random() * 20) + 5} Papers</span>
              </div>
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2"
                  style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp className="text-green-500" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-telegram-blue rounded-full flex items-center justify-center text-white font-bold">
                  {activity.subject[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{activity.subject}</div>
                  <div className="text-sm text-gray-600">{activity.action}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{activity.score}%</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
