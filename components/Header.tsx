"use client"
import ToggleSwitch from "./ToggleSwitch"
import DateRangePicker from "./DateRangePicker"
import { useState } from "react"

export default function Header() {
  const [isChartActive, setIsChartActive] = useState(true)

  return (
    <div className="bg-white border-b border-[#E0E0E0]">
      <div className="h-20 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-[#161616]">Quick Commerce</h1>
        <div className="flex items-center space-x-4">
          <ToggleSwitch isActive={isChartActive} onChange={() => setIsChartActive(!isChartActive)} />
          <DateRangePicker startDate="Aug 01, 024" endDate="Aug 03, 2024" />
        </div>
      </div>
      {/*logos blinkit zepto instamart */}
      <div className="px-6 py-4 rounded-[5px] border border-[#E0E0E0] flex">
        <div className="flex space-x-2 rounded-[5px] border border-[#E0E0E0] flex-wrap flex-row">
          <div className="py-2 px-4 bg-[#E8F5F0] rounded-[15px] flex items-center">
          <img src={'/blinkit.png?height=8&width=8'} className="w-8 h-8 mr-2 flex items-center justify-center rounded-[5px] bg-[#F8F3F0]" />
            <span className="text-[#006D5B] font-medium">Blinkit</span>
          </div>
          <div className="py-2 px-4 rounded-lg flex items-center opacity-50">
          <img src={'/zepto.png?height=8&width=8'} className="w-8 h-8 mr-2 flex items-center justify-center rounded-[5px] bg-[#F8F3F0]" />
          <span className="text-[#6F6F6F] font-medium">Zepto</span>
          </div>
          <div className="py-2 px-4 rounded-lg flex items-center opacity-50">
          <img src={'/swiggy.png?height=8&width=8'} className="w-8 h-8 mr-2 flex items-center justify-center rounded-[5px] bg-[#F8F3F0]" />
          <span className="text-[#6F6F6F] font-medium">Instamart</span>
          </div>
        </div>
      </div>
    </div>
  )
}

