"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, BarChart2 } from "lucide-react"
import { theme } from "../theme"
import DataTable, { TableColumn, TableGroup, TableRowData } from "@/components/DataTable"

//  data
type Direction = "up" | "down" | "neutral"

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
    change?: { value: number; direction: Direction }
    subRows?: SubRow[]
  }
  outOfStock: {
    value: number
    formatted: string
    change?: { value: number; direction: Direction }
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
    change?: { value: number; direction: Direction }
    subRows?: SubRow[]
  }
  estTraffic: {
    value: number
    formatted: string
    change?: { value: number; direction: Direction }
    subRows?: SubRow[]
  }
  estImpressions: {
    value: number
    formatted: string
    change?: { value: number; direction: Direction }
    subRows?: SubRow[]
  }
  ci: {
    value: number
    formatted: string
    change?: { value: number; direction: Direction }
  }
}

// Sample data - we'll replace this with real data later
const sampleData = [
  {
    id: "1",
    name: "Protein Bar 100g",
    logo: "/placeholder.svg?height=24&width=24",
    sales: { value: 93132.12, formatted: "₹93,132.12" },
    outOfStock: { value: 1.68, formatted: "1.68%" },
    totalInventory: { value: 931.9, formatted: "931.9" },
    averageRank: { value: 3.2, formatted: "3.2" },
    estTraffic: { value: 12303, formatted: "12,303" },
    estImpressions: { value: 25005, formatted: "25,005" },
    ci: { value: 1.9, formatted: "1.9" },
  },
]

export default function SkuTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [tableData, setTableData] = useState(sampleData)
  const [totals, setTotals] = useState({
    sales: 0,
    outOfStock: 0,
    totalInventory: 0,
    averageRank: 0,
    estTraffic: 0,
    estImpressions: 0,
    ci: 0,
  })

  useEffect(() => {
    let newTotals = tableData.reduce((acc, item) => ({
      sales: acc.sales + item.sales.value,
      outOfStock: acc.outOfStock + item.outOfStock.value,
      totalInventory: acc.totalInventory + item.totalInventory.value,
      averageRank: acc.averageRank + item.averageRank.value,
      estTraffic: acc.estTraffic + item.estTraffic.value,
      estImpressions: acc.estImpressions + item.estImpressions.value,
      ci: acc.ci + item.ci.value,
    }), {
      sales: 0,
      outOfStock: 0,
      totalInventory: 0,
      averageRank: 0,
      estTraffic: 0,
      estImpressions: 0,
      ci: 0,
    })

    newTotals.averageRank = Number((newTotals.averageRank / tableData.length).toFixed(1))
    newTotals.ci = Number((newTotals.ci / tableData.length).toFixed(1))
    newTotals.outOfStock = Number((newTotals.outOfStock / tableData.length).toFixed(0))

    setTotals(newTotals)
  }, [tableData])

  const formatNumber = (num: number) => new Intl.NumberFormat("en-IN").format(num)

  const columns = [
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

  const groups = [
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

  const calculateTotals = (data: TableRowData[]) => {
    const skuData = data as SKUData[]
    let totals = skuData.reduce((acc, item) => ({
      sales: acc.sales + item.sales.value,
      outOfStock: acc.outOfStock + item.outOfStock.value,
      totalInventory: acc.totalInventory + item.totalInventory.value,
      averageRank: acc.averageRank + item.averageRank.value,
      estTraffic: acc.estTraffic + item.estTraffic.value,
      estImpressions: acc.estImpressions + item.estImpressions.value,
      ci: acc.ci + item.ci.value,
    }), {
      sales: 0,
      outOfStock: 0,
      totalInventory: 0,
      averageRank: 0,
      estTraffic: 0,
      estImpressions: 0,
      ci: 0,
    })

    //  averages
    totals.averageRank = Number((totals.averageRank / skuData.length).toFixed(1))
    totals.ci = Number((totals.ci / skuData.length).toFixed(1))
    totals.outOfStock = Number((totals.outOfStock / skuData.length).toFixed(0))

    return {
      sales: `₹${formatNumber(totals.sales)}`,
      outOfStock: `${totals.outOfStock}%`,
      totalInventory: formatNumber(totals.totalInventory),
      averageRank: totals.averageRank.toString(),
      estTraffic: formatNumber(totals.estTraffic),
      estImpressions: formatNumber(totals.estImpressions),
      ci: totals.ci.toString(),
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

