"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { HelpCircle, ArrowUp, ArrowDown } from "lucide-react"

Chart.register(...registerables)

interface CityData {
  name: string
  value: string
  percentage: number
  percentChange: number
  color: string
}

interface PieChartProps {
  title: string
  totalValue: string
  totalPercentChange: number
  cities: CityData[]
}

export default function PieChart({ title, totalValue, totalPercentChange, cities }: PieChartProps) {
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
          type: "doughnut",
          data: {
            labels: cities.map((city) => city.name),
            datasets: [
              {
                data: cities.map((city) => city.percentage),
                backgroundColor: cities.map((city) => city.color),
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.parsed}%`,
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
  }, [cities])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
      <div className="p-4 border-b border-[#E0E0E0] flex justify-between items-center">
        <h3 className="text-[#525252] font-medium text-lg">{title}</h3>
        <HelpCircle size={18} className="text-[#8D8D8D] cursor-pointer" />
      </div>

      <div className="p-4">
        <div className="h-48 relative">
          <canvas ref={chartRef}></canvas>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-sm text-[#6F6F6F]">Total</div>
            <div className="text-2xl font-semibold text-[#161616]">{totalValue}</div>
            <div
              className={`flex items-center justify-center text-sm ${totalPercentChange >= 0 ? "text-[#42BE65]" : "text-[#FF6B6B]"}`}
            >
              {totalPercentChange >= 0 ? (
                <ArrowUp size={14} className="mr-1" />
              ) : (
                <ArrowDown size={14} className="mr-1" />
              )}
              <span>{Math.abs(totalPercentChange)}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {cities.map((city, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: city.color }}></div>
                <span className="text-sm text-[#6F6F6F]">{city.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-[#161616] w-16 text-right">{city.value}</div>
                <div className="text-sm text-[#8D8D8D] w-10 text-right">{city.percentage}%</div>
                <div
                  className={`flex items-center w-16 text-sm ${city.percentChange >= 0 ? "text-[#42BE65]" : "text-[#FF6B6B]"}`}
                >
                  {city.percentChange >= 0 ? (
                    <ArrowUp size={14} className="mr-1" />
                  ) : (
                    <ArrowDown size={14} className="mr-1" />
                  )}
                  <span>{Math.abs(city.percentChange)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

