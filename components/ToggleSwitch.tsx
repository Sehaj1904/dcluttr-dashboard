"use client"

interface ToggleSwitchProps {
  isActive?: boolean
  onChange?: () => void
}

export default function ToggleSwitch({ isActive = true, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center py-2 px-4 rounded-[5px] border border-[#E0E0E0] cursor-pointer">
      <img src={'/graph.png?height=4&width=4'} className="w-4 h-4 mr-2 flex items-center justify-center" />
      <button
        onClick={onChange}
        className={`w-10 h-5 rounded-full flex items-center relative transition-colors duration-200 ${
          isActive ? "bg-[#027056]" : "bg-[#8D8D8D]"
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

