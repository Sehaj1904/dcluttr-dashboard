"use client"

import { useEffect, useState } from "react"
import { fetchDashboardConfig } from "@/lib/api"
import type { DashboardConfig } from "@/lib/types"
import DashboardCard from "./DashboardCard"

export default function Dashboard() {
  const [config, setConfig] = useState<DashboardConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardConfig = async () => {
      try {
        setIsLoading(true)
        const dashboardConfig = await fetchDashboardConfig()
        setConfig(dashboardConfig)
      } catch (err) {
        console.error("Failed to load dashboard configuration:", err)
        setError("Failed to load dashboard. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardConfig()
  }, [])

  if (isLoading) {
    return (
      <div className="flex-grow bg-[#F5F5F5] p-6 flex items-center justify-center">
        <div className="text-xl text-[#6F6F6F]">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-grow bg-[#F5F5F5] p-6 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="flex-grow bg-[#F5F5F5] p-6 flex items-center justify-center">
        <div className="text-xl text-[#6F6F6F]">No dashboard configuration found.</div>
      </div>
    )
  }

  const sortedCards = [...config.cards]
    .filter((card) => card.active)
    .sort((a, b) => {
      const typeOrder = {
        linechart: 0,
        semipiechart: 1,
        table: 2
      }

      const typeComparison = typeOrder[a.visualizationType] - typeOrder[b.visualizationType]
      if (typeComparison !== 0) return typeComparison

      return a.gridStackProperties.x - b.gridStackProperties.x
    })

  const rows: any[][] = []
  let currentRow: any[] = []
  let currentRowWidth = 0

  sortedCards.forEach((card) => {
    const cardWidth = card.gridStackProperties.w

    if (currentRowWidth + cardWidth > 12) {
      rows.push(currentRow)
      currentRow = [card]
      currentRowWidth = cardWidth
    } else {
      currentRow.push(card)
      currentRowWidth += cardWidth
    }
  })

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return (
    <div className="flex-grow bg-[#F5F5F5] p-6 overflow-y-auto">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-12 gap-6 mb-6">
          {row.map((card) => (
            <div
              key={card.id}
              className={`col-span-${card.gridStackProperties.w}`}
              style={{ gridColumn: `span ${card.gridStackProperties.w}` }}
            >
              <DashboardCard card={card} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

