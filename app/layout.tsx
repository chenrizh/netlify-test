import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deploy Test',
  description: 'Testing Netlify and Coolify deployments',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
