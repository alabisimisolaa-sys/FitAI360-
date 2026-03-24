import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitAI360 — Train · Track · Transform',
  description: 'The world's most intelligent AI fitness coach. Personalized workout plans powered by AI — built around your body, goals, and lifestyle. One-time $19.',
  openGraph: {
    title: 'FitAI360 — AI-Powered Fitness Plans',
    description: 'Personalized AI workout plans. One-time $19. Delivered instantly.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}