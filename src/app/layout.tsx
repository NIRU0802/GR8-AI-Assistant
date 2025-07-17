import './globals.css' // <-- Tailwind/Global styles
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/app/theme/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Neo - Your Personal AI Assistant',
  description: 'Ask me anything, anytime!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
