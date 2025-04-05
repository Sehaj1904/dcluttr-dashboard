import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
})

export const metadata: Metadata = {
  title: "BlinkIt Analytics",
  description: "Analytics dashboard for multiple companies",
  generator: 'dcluttr'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body className={`${ibmPlexSans.className} font-sans`}>{children}</body>
    </html>
  )
}



import './globals.css'