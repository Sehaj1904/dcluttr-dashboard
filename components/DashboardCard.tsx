"use client"

import type { CardConfig } from "@/lib/types"
import LineChartCard from "./cards/LineChartCard"
import SemiPieChartCard from "./cards/SemiPieChartCard"
import TableCard from "./cards/TableCard"
import { useEffect, useState } from "react"
import { fetchLineChartData, fetchSemiPieChartData, fetchTableData, parseCubeQuery } from "@/lib/api"

interface DashboardCardProps {
  card: CardConfig
}

export default function DashboardCard({ card }: DashboardCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const queries = parseCubeQuery(card.query)

        let result
        switch (card.visualizationType) {
          case "linechart":
            result = await fetchLineChartData(queries)
            break
          case "semipiechart":
            result = await fetchSemiPieChartData(queries)
            break
          case "table":
            result = await fetchTableData(queries, card.datatableProperties)
            break
          default:
            throw new Error(`Unsupported visualization type: ${card.visualizationType}`)
        }

        setData(result)
      } catch (err) {
        console.error(`Error fetching data for card ${card.id}:`, err)
        setError(`Failed to load data for ${card.title}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [card])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 flex items-center justify-center">
        <div className="animate-pulse text-[#6F6F6F]">Loading {card.title}...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  switch (card.visualizationType) {
    case "linechart":
      return <LineChartCard title={card.title} data={data} />
    case "semipiechart":
      return <SemiPieChartCard title={card.title} data={data} />
    case "table":
      return <TableCard title={card.title} description={card.description} data={data} />
    default:
      return (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          <h3 className="text-[#525252] font-medium text-lg">{card.title}</h3>
          <p>Unsupported visualization type: {card.visualizationType}</p>
        </div>
      )
  }
}

