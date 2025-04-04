"use client"

import Sidebar from "@/components/Sidebar"
import Navigation from "@/components/Navigation"
import Header from "@/components/Header"
import Dashboard from "@/components/Dashboard"

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Dashboard />
      </div>
    </main>
  )
}

