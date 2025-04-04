"use client"

import CityTable from "./CityTable"
import SkuTable from "./SkuTable"
import LineChartCard from "./cards/LineChartCard"
import SemiPieChartCard from "./cards/SemiPieChartCard"
import { useEffect, useState } from "react"
import type { LineChartData, SemiPieChartData } from "@/lib/types"

const LoadingCard = ({ title }: { title: string }) => (
  <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 flex items-center justify-center h-[300px]">
    <div className="animate-pulse text-[#6F6F6F]">Loading {title}...</div>
  </div>
)

export default function SkuDashboard() {
  const [salesData, setSalesData] = useState<LineChartData | null>(null)
  const [itemsSoldData, setItemsSoldData] = useState<LineChartData | null>(null)
  const [citiesData, setCitiesData] = useState<SemiPieChartData | null>(null)

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Mock data for demonstration
    setSalesData({
      timeSeriesData: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        thisMonth: [100, 120, 115, 130, 140],
        lastMonth: [90, 100, 95, 110, 120]
      },
      totalValue: 140,
      previousValue: 120,
      percentChange: 16.67
    })

    setItemsSoldData({
      timeSeriesData: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        thisMonth: [500, 550, 525, 575, 600],
        lastMonth: [450, 500, 480, 520, 550]
      },
      totalValue: 600,
      previousValue: 550,
      percentChange: 9.09
    })

    setCitiesData({
      cities: [
        { name: "Delhi", value: "1,200", percentage: 40, percentChange: 5.5, color: "#42BE65" },
        { name: "Mumbai", value: "900", percentage: 30, percentChange: -2.1, color: "#FF6B6B" },
        { name: "Bangalore", value: "600", percentage: 20, percentChange: 3.2, color: "#4589FF" },
        { name: "Others", value: "300", percentage: 10, percentChange: 1.5, color: "#8D8D8D" }
      ],
      totalValue: "3,000",
      totalPercentChange: 2.5
    })
  }, [])

  // Sort cards in the desired order
  const sortedCards = [
    // First Row: Two Line Charts and Pie Chart
    {
      id: "sales",
      gridStackProperties: { w: 4, x: 0 },
      content: salesData ? (
        <LineChartCard title="Sales (MRP)" data={salesData} />
      ) : (
        <LoadingCard title="Sales (MRP)" />
      )
    },
    {
      id: "items",
      gridStackProperties: { w: 4, x: 4 },
      content: itemsSoldData ? (
        <LineChartCard title="Items Sold" data={itemsSoldData} />
      ) : (
        <LoadingCard title="Items Sold" />
      )
    },
    {
      id: "cities",
      gridStackProperties: { w: 4, x: 8 },
      content: citiesData ? (
        <SemiPieChartCard title="Top Cities" data={citiesData} />
      ) : (
        <LoadingCard title="Top Cities" />
      )
    },
    // Second Row: SKU Table
    {
      id: "sku-table",
      gridStackProperties: { w: 12, x: 0 },
      content: (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          <h3 className="text-[#525252] font-medium text-lg mb-4">SKU Performance</h3>
          <SkuTable />
        </div>
      )
    },
    // Third Row: City Table
    {
      id: "city-table",
      gridStackProperties: { w: 12, x: 0 },
      content: (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          <h3 className="text-[#525252] font-medium text-lg mb-4">City Performance</h3>
          <CityTable />
        </div>
      )
    }
  ]

  // Group cards into rows based on their width
  const rows: any[][] = []
  let currentRow: any[] = []
  let currentRowWidth = 0

  sortedCards.forEach((card) => {
    const cardWidth = card.gridStackProperties.w

    // If adding this card would exceed 12 columns, start a new row
    if (currentRowWidth + cardWidth > 12) {
      rows.push(currentRow)
      currentRow = [card]
      currentRowWidth = cardWidth
    } else {
      currentRow.push(card)
      currentRowWidth += cardWidth
    }
  })

  // Add the last row if it has any cards
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
              {card.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
} 