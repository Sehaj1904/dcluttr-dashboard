"use client"

import type { LineChartData } from "@/lib/types"
import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { HelpCircle, ArrowUp, ArrowDown } from "lucide-react"

Chart.register(...registerables)

interface LineChartCardProps {
  title: string
  data: LineChartData
}

export default function LineChartCard({ title, data }: LineChartCardProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.timeSeriesData.labels,
            datasets: [
              {
                label: "This Month",
                data: data.timeSeriesData.thisMonth,
                borderColor: "#42BE65",
                backgroundColor: "rgba(66, 190, 101, 0.1)",
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.3,
                fill: true,
              },
              {
                label: "Last Month",
                data: data.timeSeriesData.lastMonth,
                borderColor: "#FF6B6B",
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.3,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              y: {
                beginAtZero: false,
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                  color: "#8D8D8D",
                  font: {
                    family: "Inter",
                    size: 12,
                  },
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#8D8D8D",
                  font: {
                    family: "Inter",
                    size: 12,
                  },
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  const currentValue = data.totalValue.toFixed(2)
  const previousValue = data.previousValue.toFixed(2)
  const percentChange = data.percentChange

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
      <div className="p-4 border-b border-[#E0E0E0] flex justify-between items-center">
        <h3 className="text-[#525252] font-medium text-lg">{title}</h3>
        <HelpCircle size={18} className="text-[#8D8D8D] cursor-pointer" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-6">
          <div className="text-4xl font-semibold text-[#161616]">{currentValue}</div>
          <div className="flex flex-col items-end">
            <div className={`flex items-center ${percentChange >= 0 ? "text-[#42BE65]" : "text-[#FF6B6B]"}`}>
              {percentChange >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              <span className="font-medium">{Math.abs(percentChange)}%</span>
            </div>
            <div className="text-sm text-[#8D8D8D]">vs {previousValue} last month</div>
          </div>
        </div>

        <div className="h-48">
          <canvas ref={chartRef}></canvas>
        </div>

        <div className="flex items-center mt-4 gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#42BE65] mr-2"></div>
            <span className="text-sm text-[#6F6F6F]">This Month</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B] mr-2"></div>
            <span className="text-sm text-[#6F6F6F]">Last Month</span>
          </div>
        </div>
      </div>
    </div>
  )
}

