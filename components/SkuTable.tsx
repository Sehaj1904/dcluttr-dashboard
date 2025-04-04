"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, BarChart2 } from "lucide-react"
import { theme } from "../theme"
import DataTable, { TableColumn, TableGroup, TableRowData } from "@/components/DataTable"

interface ChangeIndicator {
  value: number
  direction: "up" | "down" | "neutral"
}

interface SubRow {
  label: string
  value: string
}

interface SKUData extends TableRowData {
  id: string
  name: string
  logo?: string
  sales: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  outOfStock: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  totalInventory: {
    value: number
    formatted: string
    subRows?: SubRow[]
  }
  averageRank: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  estTraffic: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  estImpressions: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  ci: {
      value: number
    formatted: string
    change?: ChangeIndicator
  }
}

// Sample data
const sampleData: SKUData[] = [
  {
    id: "1",
    name: "Protein Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 93132.12,
      formatted: "₹93,132.12",
    },
    outOfStock: {
      value: 1.68,
      formatted: "1.68%",
    },
    totalInventory: {
      value: 931.9,
      formatted: "931.9",
    },
    averageRank: {
      value: 3.2,
      formatted: "3.2",
    },
    estTraffic: {
      value: 12303,
      formatted: "12,303",
    },
    estImpressions: {
      value: 25005,
      formatted: "25,005",
    },
    ci: {
      value: 1.9,
      formatted: "1.9",
    },
  },
  {
    id: "2",
    name: "Energy Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 8526.32,
      formatted: "₹8,526.32",
    },
    outOfStock: {
      value: 6.79,
      formatted: "6.79%",
    },
    totalInventory: {
      value: 679,
      formatted: "679",
    },
    averageRank: {
      value: 7,
      formatted: "7",
    },
    estTraffic: {
      value: 3005,
      formatted: "3,005",
    },
    estImpressions: {
      value: 4231,
      formatted: "4,231",
    },
    ci: {
      value: 1.2,
      formatted: "1.2",
    },
  },
  {
    id: "3",
    name: "Choco Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 7012.72,
      formatted: "₹7,012.72",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Online",
          value: "₹4,520.50",
        },
        {
          label: "In-store",
          value: "₹2,492.22",
        },
      ],
    },
    outOfStock: {
      value: 3.28,
      formatted: "3.28%",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Warehouse",
          value: "2.1%",
        },
        {
          label: "Store",
          value: "1.18%",
        },
      ],
    },
    totalInventory: {
      value: 328,
      formatted: "328",
      subRows: [
        {
          label: "Warehouse",
          value: "220",
        },
        {
          label: "Store",
          value: "108",
        },
      ],
    },
    averageRank: {
      value: 4,
      formatted: "4",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Category",
          value: "2",
        },
        {
          label: "Overall",
          value: "6",
        },
      ],
    },
    estTraffic: {
      value: 2960,
      formatted: "2,960",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Direct",
          value: "1,800",
        },
        {
          label: "Referral",
          value: "1,160",
        },
      ],
    },
    estImpressions: {
      value: 3657,
      formatted: "3,657",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Organic",
          value: "2,200",
        },
        {
          label: "Paid",
          value: "1,457",
        },
      ],
    },
    ci: {
      value: 4.2,
      formatted: "4.2",
      change: {
        value: 2.4,
        direction: "down",
      },
    },
  },
  {
    id: "4",
    name: "SKU 3",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 9313,
      formatted: "₹9313",
    },
    outOfStock: {
      value: 1.68,
      formatted: "1.68%",
    },
    totalInventory: {
      value: 931.9,
      formatted: "931.9",
    },
    averageRank: {
      value: 11,
      formatted: "11",
    },
    estTraffic: {
      value: 1931.9,
      formatted: "19,319",
    },
    estImpressions: {
      value: 931.9,
      formatted: "₹931.9",
    },
    ci: {
      value: 1.9,
      formatted: "1.9",
    },
  },
  {
    id: "5",
    name: "SKU 4",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 0,
      formatted: "₹0",
    },
    outOfStock: {
      value: 0,
      formatted: "0",
    },
    totalInventory: {
      value: 0,
      formatted: "0",
    },
    averageRank: {
      value: 0,
      formatted: "0",
    },
    estTraffic: {
      value: 0,
      formatted: "₹0",
    },
    estImpressions: {
      value: 0,
      formatted: "₹0",
    },
    ci: {
      value: 0,
      formatted: "0",
    },
  },
]

export default function SkuTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [tableData, setTableData] = useState<SKUData[]>(sampleData)
  const [totals, setTotals] = useState({
    sales: 0,
    outOfStock: 0,
    totalInventory: 0,
    averageRank: 0,
    estTraffic: 0,
    estImpressions: 0,
    ci: 0,
  })

  // Calculate totals when data changes
  useEffect(() => {
    const newTotals = tableData.reduce(
      (acc, item) => {
        return {
          sales: acc.sales + item.sales.value,
          outOfStock: acc.outOfStock + item.outOfStock.value,
          totalInventory: acc.totalInventory + item.totalInventory.value,
          averageRank: acc.averageRank + item.averageRank.value,
          estTraffic: acc.estTraffic + item.estTraffic.value,
          estImpressions: acc.estImpressions + item.estImpressions.value,
          ci: acc.ci + item.ci.value,
        }
      },
      {
        sales: 0,
        outOfStock: 0,
        totalInventory: 0,
        averageRank: 0,
        estTraffic: 0,
        estImpressions: 0,
        ci: 0,
      },
    )

    // Calculate average for averageRank and ci
    newTotals.averageRank = Number.parseFloat((newTotals.averageRank / tableData.length).toFixed(1))
    newTotals.ci = Number.parseFloat((newTotals.ci / tableData.length).toFixed(1))

    // Calculate percentage for outOfStock
    newTotals.outOfStock = Number.parseFloat((newTotals.outOfStock / tableData.length).toFixed(0))

    setTotals(newTotals)
  }, [tableData])

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

  const columns: TableColumn[] = [
    {
      key: "name",
      title: "SKU Name",
      align: "left",
      width: "250px",
      icon: <BarChart2 size={16} className="mr-2 text-[#6F6F6F]" />,
    },
    {
      key: "sales",
      title: "Sales",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "outOfStock",
      title: "Out of Stock",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "totalInventory",
      title: "Total Inventory",
      align: "right",
      showSortIcon: true,
      borderRight: true,
    },
    {
      key: "averageRank",
      title: "Average Rank",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "estTraffic",
      title: "Est. Traffic",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "estImpressions",
      title: "Est. Impressions",
      align: "right",
      showSortIcon: true,
      borderRight: true,
    },
    {
      key: "ci",
      title: "CI",
      align: "right",
    },
  ]

  const groups: TableGroup[] = [
    {
      title: "Availability",
      colSpan: 3,
      borderRight: true,
    },
    {
      title: "Visibility",
      colSpan: 3,
      borderRight: true,
    },
    {
      title: "CI",
      colSpan: 1,
    },
  ]

  const calculateTotals = (data: TableRowData[]): Record<string, any> => {
    const skuData = data as SKUData[]
    const newTotals = skuData.reduce(
      (acc, item) => ({
        sales: acc.sales + item.sales.value,
        outOfStock: acc.outOfStock + item.outOfStock.value,
        totalInventory: acc.totalInventory + item.totalInventory.value,
        averageRank: acc.averageRank + item.averageRank.value,
        estTraffic: acc.estTraffic + item.estTraffic.value,
        estImpressions: acc.estImpressions + item.estImpressions.value,
        ci: acc.ci + item.ci.value,
      }),
      {
        sales: 0,
        outOfStock: 0,
        totalInventory: 0,
        averageRank: 0,
        estTraffic: 0,
        estImpressions: 0,
        ci: 0,
      }
    )

    // Calculate average for averageRank and ci
    newTotals.averageRank = Number.parseFloat((newTotals.averageRank / skuData.length).toFixed(1))
    newTotals.ci = Number.parseFloat((newTotals.ci / skuData.length).toFixed(1))

    // Calculate percentage for outOfStock
    newTotals.outOfStock = Number.parseFloat((newTotals.outOfStock / skuData.length).toFixed(0))

    return {
"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, BarChart2 } from "lucide-react"
import { theme } from "../theme"
import DataTable, { TableColumn, TableGroup, TableRowData } from "@/components/DataTable"

interface ChangeIndicator {
  value: number
  direction: "up" | "down" | "neutral"
}

interface SubRow {
  label: string
  value: string
}

interface SKUData extends TableRowData {
  id: string
  name: string
  logo?: string
  sales: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  outOfStock: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  totalInventory: {
    value: number
    formatted: string
    subRows?: SubRow[]
  }
  averageRank: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  estTraffic: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  estImpressions: {
    value: number
    formatted: string
    change?: ChangeIndicator
    subRows?: SubRow[]
  }
  ci: {
    value: number
    formatted: string
    change?: ChangeIndicator
  }
}

// Sample data
const sampleData: SKUData[] = [
  {
    id: "1",
    name: "Protein Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 93132.12,
      formatted: "₹93,132.12",
    },
    outOfStock: {
      value: 1.68,
      formatted: "1.68%",
    },
    totalInventory: {
      value: 931.9,
      formatted: "931.9",
    },
    averageRank: {
      value: 3.2,
      formatted: "3.2",
    },
    estTraffic: {
      value: 12303,
      formatted: "12,303",
    },
    estImpressions: {
      value: 25005,
      formatted: "25,005",
    },
    ci: {
      value: 1.9,
      formatted: "1.9",
    },
  },
  {
    id: "2",
    name: "Energy Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 8526.32,
      formatted: "₹8,526.32",
    },
    outOfStock: {
      value: 6.79,
      formatted: "6.79%",
    },
    totalInventory: {
      value: 679,
      formatted: "679",
    },
    averageRank: {
      value: 7,
      formatted: "7",
    },
    estTraffic: {
      value: 3005,
      formatted: "3,005",
    },
    estImpressions: {
      value: 4231,
      formatted: "4,231",
    },
    ci: {
      value: 1.2,
      formatted: "1.2",
    },
  },
  {
    id: "3",
    name: "Choco Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 7012.72,
      formatted: "₹7,012.72",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Online",
          value: "₹4,520.50",
        },
        {
          label: "In-store",
          value: "₹2,492.22",
        },
      ],
    },
    outOfStock: {
      value: 3.28,
      formatted: "3.28%",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Warehouse",
          value: "2.1%",
        },
        {
          label: "Store",
          value: "1.18%",
        },
      ],
    },
    totalInventory: {
      value: 328,
      formatted: "328",
      subRows: [
        {
          label: "Warehouse",
          value: "220",
        },
        {
          label: "Store",
          value: "108",
        },
      ],
    },
    averageRank: {
      value: 4,
      formatted: "4",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Category",
          value: "2",
        },
        {
          label: "Overall",
          value: "6",
        },
      ],
    },
    estTraffic: {
      value: 2960,
      formatted: "2,960",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Direct",
          value: "1,800",
        },
        {
          label: "Referral",
          value: "1,160",
        },
      ],
    },
    estImpressions: {
      value: 3657,
      formatted: "3,657",
      change: {
        value: 2.4,
        direction: "up",
      },
      subRows: [
        {
          label: "Organic",
          value: "2,200",
        },
        {
          label: "Paid",
          value: "1,457",
        },
      ],
    },
    ci: {
      value: 4.2,
      formatted: "4.2",
      change: {
        value: 2.4,
        direction: "down",
      },
    },
  },
  {
    id: "4",
    name: "SKU 3",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 9313,
      formatted: "₹9313",
    },
    outOfStock: {
      value: 1.68,
      formatted: "1.68%",
    },
    totalInventory: {
      value: 931.9,
      formatted: "931.9",
    },
    averageRank: {
      value: 11,
      formatted: "11",
    },
    estTraffic: {
      value: 1931.9,
      formatted: "19,319",
    },
    estImpressions: {
      value: 931.9,
      formatted: "₹931.9",
    },
    ci: {
      value: 1.9,
      formatted: "1.9",
    },
  },
  {
    id: "5",
    name: "SKU 4",
    logo: "/placeholder.svg?height=24&width=24",
    sales: {
      value: 0,
      formatted: "₹0",
    },
    outOfStock: {
      value: 0,
      formatted: "0",
    },
    totalInventory: {
      value: 0,
      formatted: "0",
    },
    averageRank: {
      value: 0,
      formatted: "0",
    },
    estTraffic: {
      value: 0,
      formatted: "₹0",
    },
    estImpressions: {
      value: 0,
      formatted: "₹0",
    },
    ci: {
      value: 0,
      formatted: "0",
    },
  },
]

export default function SkuTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [tableData, setTableData] = useState<SKUData[]>(sampleData)
  const [totals, setTotals] = useState({
    sales: 0,
    outOfStock: 0,
    totalInventory: 0,
    averageRank: 0,
    estTraffic: 0,
    estImpressions: 0,
    ci: 0,
  })

  // Calculate totals when data changes
  useEffect(() => {
    const newTotals = tableData.reduce(
      (acc, item) => {
        return {
          sales: acc.sales + item.sales.value,
          outOfStock: acc.outOfStock + item.outOfStock.value,
          totalInventory: acc.totalInventory + item.totalInventory.value,
          averageRank: acc.averageRank + item.averageRank.value,
          estTraffic: acc.estTraffic + item.estTraffic.value,
          estImpressions: acc.estImpressions + item.estImpressions.value,
          ci: acc.ci + item.ci.value,
        }
      },
      {
        sales: 0,
        outOfStock: 0,
        totalInventory: 0,
        averageRank: 0,
        estTraffic: 0,
        estImpressions: 0,
        ci: 0,
      },
    )

    // Calculate average for averageRank and ci
    newTotals.averageRank = Number.parseFloat((newTotals.averageRank / tableData.length).toFixed(1))
    newTotals.ci = Number.parseFloat((newTotals.ci / tableData.length).toFixed(1))

    // Calculate percentage for outOfStock
    newTotals.outOfStock = Number.parseFloat((newTotals.outOfStock / tableData.length).toFixed(0))

    setTotals(newTotals)
  }, [tableData])

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

  const columns: TableColumn[] = [
    {
      key: "name",
      title: "SKU Name",
      align: "left",
      width: "250px",
      icon: <BarChart2 size={16} className="mr-2 text-[#6F6F6F]" />,
    },
    {
      key: "sales",
      title: "Sales",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "outOfStock",
      title: "Out of Stock",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "totalInventory",
      title: "Total Inventory",
      align: "right",
      showSortIcon: true,
      borderRight: true,
    },
    {
      key: "averageRank",
      title: "Average Rank",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "estTraffic",
      title: "Est. Traffic",
      align: "right",
      showSortIcon: true,
    },
    {
      key: "estImpressions",
      title: "Est. Impressions",
      align: "right",
      showSortIcon: true,
      borderRight: true,
    },
    {
      key: "ci",
      title: "CI",
      align: "right",
    },
  ]

  const groups: TableGroup[] = [
    {
      title: "Availability",
      colSpan: 3,
      borderRight: true,
    },
    {
      title: "Visibility",
      colSpan: 3,
      borderRight: true,
    },
    {
      title: "CI",
      colSpan: 1,
    },
  ]

  const calculateTotals = (data: SKUData[]): { [key: string]: string } => {
    const newTotals = data.reduce(
      (acc, item) => ({
        sales: acc.sales + item.sales.value,
        outOfStock: acc.outOfStock + item.outOfStock.value,
        totalInventory: acc.totalInventory + item.totalInventory.value,
        averageRank: acc.averageRank + item.averageRank.value,
        estTraffic: acc.estTraffic + item.estTraffic.value,
        estImpressions: acc.estImpressions + item.estImpressions.value,
        ci: acc.ci + item.ci.value,
      }),
      {
        sales: 0,
        outOfStock: 0,
        totalInventory: 0,
        averageRank: 0,
        estTraffic: 0,
        estImpressions: 0,
        ci: 0,
      }
    )

    // Calculate average for averageRank and ci
    newTotals.averageRank = Number.parseFloat((newTotals.averageRank / data.length).toFixed(1))
    newTotals.ci = Number.parseFloat((newTotals.ci / data.length).toFixed(1))

    // Calculate percentage for outOfStock
    newTotals.outOfStock = Number.parseFloat((newTotals.outOfStock / data.length).toFixed(0))

    return {
      sales: `₹${formatNumber(newTotals.sales)}`,
      outOfStock: `${newTotals.outOfStock}%`,
      totalInventory: formatNumber(newTotals.totalInventory),
      averageRank: newTotals.averageRank.toString(),
      estTraffic: formatNumber(newTotals.estTraffic),
      estImpressions: formatNumber(newTotals.estImpressions),
      ci: newTotals.ci.toString(),
    }
  }

  return (
    <DataTable
      columns={columns}
      groups={groups}
      data={tableData}
      checkboxColor="#2E7D32"
      icon={<BarChart2 size={16} className="mr-2 text-[#6F6F6F]" />}
      calculateTotals={calculateTotals}
    />
  )
}

