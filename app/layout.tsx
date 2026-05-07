import type { Metadata } from 'next'
import { Inter, Lora, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Hire This Guy',
    template: '%s · Grey E',
  },
  description: 'CS student, thinks in systems, feels in details, forgot to eat lunch',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <div className="max-w-[760px] mx-auto px-6 py-8 pb-16">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
