import type { TableData } from "@/lib/types"
import DataTable from "../DataTable"
import { BarChart2, MapPin } from "lucide-react"
import { theme } from "@/theme"

interface TableCardProps {
  title: string
  description: string
  data: TableData
}

export default function TableCard({ title, description, data }: TableCardProps) {
  const isCityTable = title.toLowerCase().includes("city")
  const icon = isCityTable ? (
    <MapPin size={16} className="mr-2 text-[#6F6F6F]" />
  ) : (
    <BarChart2 size={16} className="mr-2 text-[#6F6F6F]" />
  )
  const checkboxColor = isCityTable ? "#2E7D32" : theme.colors.primary

  // Calculate totals for the table
  const calculateTotals = (rows: any[]) => {
    const totals: Record<string, any> = {}

    if (rows.length === 0) return totals

    // Get all numeric columns
    const numericColumns = Object.keys(rows[0]).filter((key) => {
      const value = rows[0][key]
      return typeof value === "object" && value !== null && "value" in value && typeof value.value === "number"
    })

    // Calculate sum for each numeric column
    numericColumns.forEach((column) => {
      const sum = rows.reduce((acc, row) => acc + (row[column]?.value || 0), 0)

      // Format based on column type
      if (column.includes("sales") || column.includes("mrp")) {
        totals[column] = `₹${new Intl.NumberFormat("en-IN").format(sum)}`
      } else if (column.includes("percent") || column.includes("drr")) {
        totals[column] = `${(sum / rows.length).toFixed(1)}%`
      } else if (column.includes("rank")) {
        totals[column] = (sum / rows.length).toFixed(1)
      } else {
        totals[column] = new Intl.NumberFormat("en-IN").format(sum)
      }
    })

    return totals
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium text-[#161616]">{title}</h2>
          <p className="text-sm text-[#6F6F6F]">{description}</p>
        </div>
        <button
          className="flex items-center justify-between px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: "#2E7D32" }}
        >
          <span className="font-medium">Filters(1)</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <DataTable
        columns={data.columns}
        data={data.rows}
        icon={icon}
        calculateTotals={() => calculateTotals(data.rows)}
        checkboxColor={checkboxColor}
      />
    </div>
  )
}

