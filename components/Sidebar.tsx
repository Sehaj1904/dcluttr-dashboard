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
      logo: "/placeholder.svg?height=40&width=40",
      selected: true,
    },
    {
      id: "2",
      name: "Mama Earth",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Boat",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ])

  const selectCompany = (id: string) => {
    setCompanies(
      companies.map((company) => ({
        ...company,
        selected: company.id === id,
      })),
    )
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{
        borderRight: `1px solid ${theme.colors.border.light}`,
        width: "120px",
        backgroundColor: theme.colors.background.dark,
      }}
    >
      <div className="flex-1 flex flex-col items-center py-4 bg-white overflow-y-auto">
        {companies.map((company) => (
          <div key={company.id} className={`relative mb-6 cursor-pointer`} onClick={() => selectCompany(company.id)}>
            {company.id === "1" && (
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  border: `2px solid ${theme.colors.secondary}`,
                  borderRadius: theme.borderRadius.lg,
                  padding: "2px",
                }}
              ></div>
            )}
            {company.id === "1" && (
              <div
                className="w-16 h-16 flex items-center justify-center rounded-lg bg-[#F8F3F0]"
                style={{
                  borderRadius: theme.borderRadius.lg,
                }}
              >
                <div className="text-center font-semibold text-sm" style={{ color: theme.colors.company.perfora.text }}>
                  perfora
                </div>
              </div>
            )}
            {company.id === "2" && (
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-white">
                <div className="text-center">
                  <div className="text-[#0099CC] font-bold text-sm">mama</div>
                  <div className="text-[#CCCC00] font-bold text-sm">earth</div>
                </div>
              </div>
            )}
            {company.id === "3" && (
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-black">
                <div className="relative w-10 h-10">
                  <div
                    className="absolute inset-0 bg-red-600"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      transform: "rotate(45deg)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 bg-red-800"
                    style={{
                      clipPath: "polygon(50% 30%, 70% 50%, 50% 70%, 30% 50%)",
                      transform: "rotate(45deg)",
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div
          className="w-16 h-16 flex items-center justify-center rounded-lg border-2 border-dashed cursor-pointer"
          style={{ borderColor: theme.colors.secondary }}
        >
          <Plus size={24} color={theme.colors.secondary} />
        </div>
      </div>
      <div className="bg-white py-4 flex flex-col items-center sticky bottom-0">
        <div className="mb-4 cursor-pointer">
          <User size={24} color={theme.colors.icon.default} />
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: theme.colors.avatar.purple }}
        >
          SS
        </div>
      </div>
    </div>
  )
}

