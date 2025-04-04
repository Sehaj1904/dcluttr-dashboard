"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [isToggled, setIsToggled] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("blinkit")

  return (
    <div className="bg-white border-b border-[#E0E0E0]">
      {/* Top Section */}
      <div className="h-20 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-[#161616]">Quick Commerce</h1>
        <div className="flex items-center gap-4">
          {/* Toggle Switch */}
          <div className="flex items-center gap-2">
            <div 
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                isToggled ? "bg-[#2E7D32]" : "bg-[#E0E0E0]"
              }`}
              onClick={() => setIsToggled(!isToggled)}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isToggled ? "transform translate-x-4" : ""
                }`}
              />
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded-lg cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.8333 3.33337H4.16667C3.24619 3.33337 2.5 4.07957 2.5 5.00004V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V5.00004C17.5 4.07957 16.7538 3.33337 15.8333 3.33337Z" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 1.66663V4.99996" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66669 1.66663V4.99996" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 8.33337H17.5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#161616] text-sm">Aug 01, 024 - Aug 03, 2024</span>
            <ChevronDown size={16} className="text-[#525252]" />
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="px-6 py-4 border-b border-[#E0E0E0]">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPlatform("blinkit")}
            className={`py-2 px-4 rounded-lg flex items-center transition-colors duration-200 ${
              selectedPlatform === "blinkit" ? "bg-[#E8F5F0]" : ""
            }`}
          >
            <div className="w-6 h-6 bg-[#FFC72C] rounded-sm flex items-center justify-center mr-2">
              <span className="text-xs font-bold">BB</span>
            </div>
            <span className={`font-medium ${
              selectedPlatform === "blinkit" ? "text-[#006D5B]" : "text-[#6F6F6F]"
            }`}>Blinkit</span>
          </button>

          <button
            onClick={() => setSelectedPlatform("zepto")}
            className={`py-2 px-4 rounded-lg flex items-center transition-colors duration-200 ${
              selectedPlatform === "zepto" ? "bg-[#E8F5F0]" : ""
            }`}
          >
            <div className="w-6 h-6 bg-[#D8CEF6] rounded-sm flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-white">Z</span>
            </div>
            <span className={`font-medium ${
              selectedPlatform === "zepto" ? "text-[#006D5B]" : "text-[#6F6F6F]"
            }`}>Zepto</span>
          </button>

          <button
            onClick={() => setSelectedPlatform("instamart")}
            className={`py-2 px-4 rounded-lg flex items-center transition-colors duration-200 ${
              selectedPlatform === "instamart" ? "bg-[#E8F5F0]" : ""
            }`}
          >
            <div className="w-6 h-6 bg-[#FFCDB2] rounded-sm flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-white">I</span>
            </div>
            <span className={`font-medium ${
              selectedPlatform === "instamart" ? "text-[#006D5B]" : "text-[#6F6F6F]"
            }`}>Instamart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

