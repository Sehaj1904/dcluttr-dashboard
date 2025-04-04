"use client"

import { useState } from "react"
import { theme } from "../theme"
import { User, Plus } from "lucide-react"

interface Company {
  id: string
  name: string
  logo: string
  selected?: boolean
}

export default function Sidebar() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Perfora",
      logo: "/perfora.png?height=40&width=40",
      selected: true,
    },
    {
      id: "2",
      name: "Mama Earth",
      logo: "/mama_earth.png?height=40&width=40",
    },
    {
      id: "3",
      name: "Boat",
      logo: "/boat.png?height=40&width=40",
    },
  ])


  return (
    <div
      className="flex flex-col h-full"
      style={{
        borderRight: `1px solid ${theme.colors.border.light}`,
        width: "120px",
        backgroundColor: theme.colors.background.dark,
      }}
    >
      {/* with logo */}
      <div className="flex-1 flex flex-col items-center py-4 bg-white overflow-y-auto">
        {companies.map((company) => (
          <div key={company.id} className={`relative mb-6 cursor-pointer`}>
                <img src={company.logo} alt={company.name} className="w-16 h-16 flex items-center justify-center rounded-[20px]  bg-[#F8F3F0]" />
          </div>
        ))}
           <img src={'/plus.png?height=40&width=40'} className="w-16 h-16 flex items-center justify-center rounded-[20px] bg-[#F8F3F0]" />
      </div>
      <div className="bg-white py-4 flex flex-col items-center sticky bottom-0">
        <div className="mb-4 cursor-pointer">
        <img src={'/users.png?height=6&width=6'} className="w-6 h-6 flex items-center justify-center" />
        </div>
        <img src={'/ss2.png?height=8&width=8'} className="w-8 h-8 flex items-center justify-center rounded-[20px]" />
      </div>
    </div>
  )
}

