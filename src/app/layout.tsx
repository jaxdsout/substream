import type { Metadata, Viewport } from 'next'
import { Bungee, Bungee_Hairline, Share_Tech_Mono } from 'next/font/google'
import './globals.css'

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
  display: 'swap',
})

const bungeeHairline = Bungee_Hairline({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee-hairline',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'substream',
  description: 'Find where to stream movies and TV shows',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${bungeeHairline.variable} ${shareTechMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
