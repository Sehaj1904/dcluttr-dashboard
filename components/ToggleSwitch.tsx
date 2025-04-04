"use client"

import { LineChart } from "lucide-react"

interface ToggleSwitchProps {
  isActive?: boolean
  onChange?: () => void
}

export default function ToggleSwitch({ isActive = true, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center bg-[#F5F5F5] py-2 px-4 rounded-full border border-[#E0E0E0]">
      <LineChart size={20} className="text-[#6F6F6F] mr-3" />
      <button
        onClick={onChange}
        className={`w-10 h-5 rounded-full flex items-center relative transition-colors duration-200 ${
          isActive ? "bg-[#42BE65]" : "bg-[#8D8D8D]"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-transform duration-200 ${
            isActive ? "right-0.5" : "left-0.5"
          }`}
        ></div>
      </button>
    </div>
  )
}

