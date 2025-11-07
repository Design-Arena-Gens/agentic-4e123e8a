'use client'

import { useState } from 'react'
import { Brain, Send, Sparkles, BookOpen, HelpCircle, Lightbulb } from 'lucide-react'

interface AIAssistantProps {
  grade: number
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIAssistant({ grade }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI learning assistant for Grade ${grade}. I can help you with:\n\n• Explaining difficult concepts\n• Solving problems step-by-step\n• Providing study tips\n• Answering subject questions\n• Generating practice problems\n\nHow can I help you today?`
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickPrompts = [
    "Explain quadratic equations",
    "Help with Newton's laws",
    "Chemistry periodic table tips",
    "Biology cell structure",
    "Grammar rules explained",
    "Programming basics"
  ]

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, grade)
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">AI Learning Assistant</h2>
            <p className="text-gray-600">Powered by Advanced AI - Grade {grade}</p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="glass-effect rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="text-yellow-500" />
            Quick Start Prompts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-4 py-3 bg-gradient-to-br from-telegram-blue/10 to-purple-500/10 hover:from-telegram-blue/20 hover:to-purple-500/20 rounded-xl text-left text-sm font-medium text-gray-700 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl min-h-[500px] max-h-[600px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'telegram-gradient text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
              {message.role === 'user' && (
                <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">You</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="glass-effect rounded-2xl p-4 shadow-xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your studies..."
            className="flex-1 px-6 py-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-telegram-blue"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-6 py-4 telegram-gradient text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-xl p-6 shadow-xl">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Concept Explanations</h3>
          <p className="text-sm text-gray-600">Get clear, detailed explanations of difficult topics</p>
        </div>

        <div className="glass-effect rounded-xl p-6 shadow-xl">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Problem Solving</h3>
          <p className="text-sm text-gray-600">Step-by-step solutions to your homework problems</p>
        </div>

        <div className="glass-effect rounded-xl p-6 shadow-xl">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Study Tips</h3>
          <p className="text-sm text-gray-600">Personalized study strategies and exam preparation</p>
        </div>
      </div>
    </div>
  )
}

function generateAIResponse(input: string, grade: number): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes('quadratic')) {
    return `Great question about quadratic equations!\n\nA quadratic equation has the form: ax² + bx + c = 0\n\nKey concepts:\n• The graph is a parabola\n• Solutions found using: factoring, completing the square, or the quadratic formula\n• Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\nExample: x² - 5x + 6 = 0\nFactors to: (x-2)(x-3) = 0\nSolutions: x = 2 or x = 3\n\nWould you like me to solve a specific problem for you?`
  }

  if (lowerInput.includes('newton')) {
    return `Newton's Laws of Motion - Essential Physics!\n\n**First Law (Inertia):**\nAn object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n**Second Law (F=ma):**\nForce equals mass times acceleration. This relates force, mass, and acceleration.\n\n**Third Law (Action-Reaction):**\nFor every action, there is an equal and opposite reaction.\n\nThese laws form the foundation of classical mechanics. Which law would you like to explore in more detail?`
  }

  if (lowerInput.includes('periodic table') || lowerInput.includes('chemistry')) {
    return `The Periodic Table is organized brilliantly!\n\n**Key Features:**\n• Elements arranged by atomic number (number of protons)\n• Rows = Periods (indicate electron shells)\n• Columns = Groups (similar chemical properties)\n\n**Important Groups:**\n• Group 1: Alkali metals (reactive)\n• Group 17: Halogens (very reactive non-metals)\n• Group 18: Noble gases (inert)\n\n**Study Tips:**\n1. Learn the first 20 elements in order\n2. Understand electron configuration patterns\n3. Remember: groups have similar properties\n\nNeed help with a specific element or concept?`
  }

  if (lowerInput.includes('cell') || lowerInput.includes('biology')) {
    return `Cell Structure - The Building Blocks of Life!\n\n**Main Components:**\n• Cell Membrane: Controls what enters/exits\n• Nucleus: Contains DNA, controls cell activities\n• Mitochondria: Powerhouse - produces ATP energy\n• Ribosomes: Protein synthesis\n• Cytoplasm: Jelly-like substance holding organelles\n\n**Two Types:**\n1. Prokaryotic: No nucleus (bacteria)\n2. Eukaryotic: Has nucleus (plants, animals)\n\n**Plant vs Animal Cells:**\n• Plants: Have cell wall, chloroplasts, large vacuole\n• Animals: No cell wall, smaller vacuoles\n\nWhat aspect of cells interests you most?`
  }

  if (lowerInput.includes('grammar') || lowerInput.includes('english')) {
    return `Essential Grammar Rules!\n\n**Parts of Speech:**\n• Nouns: Person, place, thing, or idea\n• Verbs: Action or state of being\n• Adjectives: Describe nouns\n• Adverbs: Describe verbs, adjectives, or other adverbs\n\n**Common Rules:**\n1. Subject-verb agreement\n2. Proper tense consistency\n3. Correct pronoun usage\n4. Active vs passive voice\n\n**Tips for Grade ${grade}:**\n• Read widely to see grammar in context\n• Practice writing regularly\n• Review and edit your work\n\nWhich grammar topic would you like to practice?`
  }

  if (lowerInput.includes('programming') || lowerInput.includes('computer')) {
    return `Programming Basics - Let's Start Coding!\n\n**Core Concepts:**\n• Variables: Store data\n• Data Types: Numbers, text, booleans\n• Loops: Repeat code (for, while)\n• Conditions: Make decisions (if, else)\n• Functions: Reusable code blocks\n\n**Popular First Languages:**\n1. Python: Easy to learn, powerful\n2. JavaScript: Web development\n3. Java: Widely used, structured\n\n**Getting Started:**\n• Choose a language\n• Practice coding daily\n• Start with small projects\n• Use online resources and tutorials\n\nWhich programming language are you interested in learning?`
  }

  // Default response
  return `I'd be happy to help you with that!\n\nFor Grade ${grade}, I can assist with:\n\n✓ Mathematics - Algebra, Geometry, Calculus, etc.\n✓ Physics - Mechanics, Electricity, Optics, etc.\n✓ Chemistry - Atoms, Reactions, Organic chemistry, etc.\n✓ Biology - Cells, Genetics, Ecology, etc.\n✓ English - Grammar, Literature, Writing skills\n✓ Computer Science - Programming, Algorithms, Data structures\n\nCould you please provide more details about what you'd like to learn? For example:\n• A specific topic or concept\n• A problem you need help solving\n• Study strategies for an upcoming exam\n\nI'm here to help you succeed!`
}
