import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Telegram Board - Educational Platform',
  description: 'AI-powered educational platform for grades 9-12',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
