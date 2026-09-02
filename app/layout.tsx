import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Workflow Observability Dashboard — UI Concept',
  description: 'A workflow orchestration dashboard UI concept demonstrating execution monitoring, fault-injection visualization, and real-time telemetry.',
  icons: {
    icon: '/favicon.ico',
  },
  robots: 'noindex',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07172B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <body className="antialiased font-sans bg-[#07172B] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
