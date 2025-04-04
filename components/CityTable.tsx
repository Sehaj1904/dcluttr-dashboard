"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import { theme } from "../theme"

interface CityData {
  id: string
  name: string
  sales: {
    value: number
    formatted: string
    change?: {
      value: number
      direction: "up" | "down" | "neutral"
    }
    subRows?: {
      label: string
      value: string
    }[]
  }
  orders: {
    value: number
    formatted: string | number
    change?: {
      value: number
      direction: "up" | "down" | "neutral"
    }
    subRows?: {
      label: string
      value: string
    }[]
  }
  revenue: {
    value: number
    formatted: string
    change?: {
      value: number
      direction: "up" | "down" | "neutral"
    }
    subRows?: {
      label: string
      value: string
    }[]
  }
  traffic: {
    value: number
    formatted: string | number
    change?: {
      value: number
      direction: "up" | "down" | "neutral"
    }
    subRows?: {
      label: string
      value: string
    }[]
  }
}

// Sample data
const sampleData: CityData[] = [
  {
    id: "1",
    name: "Delhi",
    sales: {
      value: 93132.12,
      formatted: "₹93,132.12",
    },
    orders: {
      value: 1245,
      formatted: 1245,
    },
    revenue: {
      value: 85000,
      formatted: "₹85,000",
    },
    traffic: {
      value: 12303,
      formatted: 12303,
    },
  },
  {
    id: "2",
    name: "Mumbai",
    sales: {
      value: 78526.32,
      formatted: "₹78,526.32",
    },
    orders: {
      value: 1079,
      formatted: 1079,
    },
    revenue: {
      value: 72000,
      formatted: "₹72,000",
    },
    traffic: {
      value: 10005,
      formatted: 10005,
    },
  },
  {
    id: "3",
    name: "Bengaluru",
    sales: {
      value: 67012.72,
      formatted: "₹67,012.72",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Online",
          value: "₹45,320.50",
        },
        {
          label: "In-store",
          value: "₹21,692.22",
        },
      ],
    },
    orders: {
      value: 928,
      formatted: 928,
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Online",
          value: "620",
        },
        {
          label: "In-store",
          value: "308",
        },
      ],
    },
    revenue: {
      value: 58000,
      formatted: "₹58,000",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Online",
          value: "₹38,000",
        },
        {
          label: "In-store",
          value: "₹20,000",
        },
      ],
    },
    traffic: {
      value: 8960,
      formatted: 8960,
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Direct",
          value: "5,200",
        },
        {
          label: "Referral",
          value: "3,760",
        },
      ],
    },
  },
  {
    id: "4",
    name: "Hyderabad",
    sales: {
      value: 59313,
      formatted: "₹59,313",
    },
    orders: {
      value: 831,
      formatted: 831,
    },
    revenue: {
      value: 51000,
      formatted: "₹51,000",
    },
    traffic: {
      value: 7931,
      formatted: 7931,
    },
  },
  {
    id: "5",
    name: "Chennai",
    sales: {
      value: 42500,
      formatted: "₹42,500",
      change: {
        value: 1.8,
        direction: "down",
      },
      subRows: [
        {
          label: "Online",
          value: "₹28,500",
        },
        {
          label: "In-store",
          value: "₹14,000",
        },
      ],
    },
    orders: {
      value: 650,
      formatted: 650,
      change: {
        value: 1.8,
        direction: "down",
      },
      subRows: [
        {
          label: "Online",
          value: "420",
        },
        {
          label: "In-store",
          value: "230",
        },
      ],
    },
    revenue: {
      value: 38000,
      formatted: "₹38,000",
      change: {
        value: 1.8,
        direction: "down",
      },
      subRows: [
        {
          label: "Online",
          value: "₹25,000",
        },
        {
          label: "In-store",
          value: "₹13,000",
        },
      ],
    },
    traffic: {
      value: 6500,
      formatted: 6500,
      change: {
        value: 1.8,
        direction: "down",
      },
      subRows: [
        {
          label: "Direct",
          value: "4,200",
        },
        {
          label: "Referral",
          value: "2,300",
        },
      ],
    },
  },
]

export default function CityTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>(["1", "3"]) // Pre-select some rows
  const [data, setData] = useState<CityData[]>(sampleData)
  const [totals, setTotals] = useState({
    sales: 0,
    orders: 0,
    revenue: 0,
    traffic: 0,
  })

  // Calculate totals when data changes
  useEffect(() => {
    const newTotals = data.reduce(
      (acc, item) => {
        return {
          sales: acc.sales + item.sales.value,
          orders: acc.orders + item.orders.value,
          revenue: acc.revenue + item.revenue.value,
          traffic: acc.traffic + item.traffic.value,
        }
      },
      {
        sales: 0,
        orders: 0,
        revenue: 0,
        traffic: 0,
      },
    )

    setTotals(newTotals)
  }, [data])

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const isRowSelected = (id: string) => selectedRows.includes(id)

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num)
  }

  const renderChangeIndicator = (change?: { value: number; direction: "up" | "down" | "neutral" }) => {
    if (!change) return null

    const color =
      change.direction === "up"
        ? theme.colors.secondary
        : change.direction === "down"
          ? "#FF6B6B"
          : theme.colors.text.secondary

    const Arrow =
      change.direction === "up"
        ? () => <span style={{ color }}>↑</span>
        : change.direction === "down"
          ? () => <span style={{ color }}>↓</span>
          : () => <span style={{ color }}>-</span>

    return (
      <div className="flex items-center text-xs mt-1" style={{ color }}>
        <Arrow /> {change.value}%
      </div>
    )
  }

  const renderSubRows = (
    subRows?: {
      label: string
      value: string
    }[],
  ) => {
    if (!subRows) return null

    return (
      <div className="mt-1 pl-2 border-l-2 border-[#E0E0E0]">
        {subRows.map((row, index) => (
          <div key={index} className="flex justify-between text-xs text-[#6F6F6F] mt-1">
            <span>{row.label}:</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-[#E0E0E0]">
              <th className="p-3 text-left font-medium text-[#525252] w-[250px]">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-[#6F6F6F]" />
                  <span>City Name</span>
                </div>
              </th>
              <th className="p-3 text-right font-medium text-[#525252]">
                <div className="flex items-center justify-end">
                  <span>Sales</span>
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-right font-medium text-[#525252]">
                <div className="flex items-center justify-end">
                  <span>Orders</span>
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-right font-medium text-[#525252]">
                <div className="flex items-center justify-end">
                  <span>Revenue</span>
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
              <th className="p-3 text-right font-medium text-[#525252]">
                <div className="flex items-center justify-end">
                  <span>Traffic</span>
                  <ChevronDown size={14} className="ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className={`border-b border-[#E0E0E0] ${isRowSelected(row.id) ? "bg-[#F5F5F5]" : ""}`}>
                <td className="p-3">
                  <div className="flex items-center">
                    <div
                      className="w-5 h-5 rounded border border-[#E0E0E0] mr-3 flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: isRowSelected(row.id) ? "#2E7D32" : "transparent",
                        borderColor: isRowSelected(row.id) ? "#2E7D32" : "#E0E0E0",
                      }}
                      onClick={() => toggleRowSelection(row.id)}
                      role="checkbox"
                      aria-checked={isRowSelected(row.id)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          toggleRowSelection(row.id)
                        }
                      }}
                    >
                      {isRowSelected(row.id) && <Check size={14} color="white" />}
                    </div>
                    <span className="font-medium text-[#161616]">{row.name}</span>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div>{row.sales.formatted}</div>
                  {renderChangeIndicator(row.sales.change)}
                  {renderSubRows(row.sales.subRows)}
                </td>
                <td className="p-3 text-right">
                  <div>{row.orders.formatted}</div>
                  {renderChangeIndicator(row.orders.change)}
                  {renderSubRows(row.orders.subRows)}
                </td>
                <td className="p-3 text-right">
                  <div>{row.revenue.formatted}</div>
                  {renderChangeIndicator(row.revenue.change)}
                  {renderSubRows(row.revenue.subRows)}
                </td>
                <td className="p-3 text-right">
                  <div>{row.traffic.formatted}</div>
                  {renderChangeIndicator(row.traffic.change)}
                  {renderSubRows(row.traffic.subRows)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#E0E0E0] bg-[#F5F5F5]">
              <td className="p-3 font-bold text-[#161616]">Total</td>
              <td className="p-3 text-right font-bold text-[#161616]">₹{formatNumber(totals.sales)}</td>
              <td className="p-3 text-right font-bold text-[#161616]">{formatNumber(totals.orders)}</td>
              <td className="p-3 text-right font-bold text-[#161616]">₹{formatNumber(totals.revenue)}</td>
              <td className="p-3 text-right font-bold text-[#161616]">{formatNumber(totals.traffic)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

