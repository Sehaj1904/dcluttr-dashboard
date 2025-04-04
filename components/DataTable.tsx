"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { theme } from "../theme"

export interface TableColumn {
  key: string
  title: string
  align?: "left" | "right" | "center"
  width?: string
  icon?: React.ReactNode
  showSortIcon?: boolean
  colSpan?: number
  borderLeft?: boolean
  borderRight?: boolean
}

export interface TableGroup {
  title: string
  colSpan: number
  borderLeft?: boolean
  borderRight?: boolean
}

export interface TableRowData {
  id: string
  [key: string]: any
}

interface DataTableProps {
  columns: TableColumn[]
  groups?: TableGroup[]
  data: TableRowData[]
  checkboxColor?: string
  icon?: React.ReactNode
  calculateTotals?: (data: TableRowData[]) => Record<string, any>
  renderCell?: (column: TableColumn, row: TableRowData) => React.ReactNode
  maxRows?: number
}

export default function DataTable({
  columns,
  groups,
  data,
  checkboxColor = "#2E7D32",
  icon,
  calculateTotals,
  renderCell,
  maxRows = 4,
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [tableData, setTableData] = useState<TableRowData[]>(data)
  const [totals, setTotals] = useState<Record<string, any>>({})

  useEffect(() => {
    if (data.length > 0) {
      setSelectedRows([data[0].id, data[2].id])
    }
  }, [data])

  useEffect(() => {
    if (calculateTotals) {
      setTotals(calculateTotals(tableData))
    }
  }, [tableData, calculateTotals])

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const isRowSelected = (id: string) => selectedRows.includes(id)

  const renderCheckbox = (rowId: string) => (
    <div
      className="w-5 h-5 rounded border border-[#E0E0E0] flex items-center justify-center cursor-pointer"
      style={{
        backgroundColor: isRowSelected(rowId) ? checkboxColor : "transparent",
        borderColor: isRowSelected(rowId) ? checkboxColor : "#E0E0E0",
      }}
      onClick={() => toggleRowSelection(rowId)}
      role="checkbox"
      aria-checked={isRowSelected(rowId)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggleRowSelection(rowId)
        }
      }}
    >
      {isRowSelected(rowId) && <Check size={14} color="white" />}
    </div>
  )

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
    current?: string | number,
    previous?: string | number,
    change?: { value: number; direction: "up" | "down" | "neutral" },
  ) => {
    if (!change) return null

    return (
      <div className="mt-1 pl-2 border-l-2 border-[#E0E0E0]">
        <div className="flex justify-between text-xs text-[#6F6F6F] mt-1">
          <span>Current:</span>
          <span>{current}</span>
        </div>
        <div className="flex justify-between text-xs text-[#6F6F6F] mt-1">
          <span>Previous:</span>
          <span>{previous}</span>
        </div>
        <div
          className="flex justify-between text-xs mt-1"
          style={{
            color:
              change.direction === "up"
                ? theme.colors.secondary
                : change.direction === "down"
                  ? "#FF6B6B"
                  : theme.colors.text.secondary,
          }}
        >
          <span>Change:</span>
          <span className="flex items-center">
            {change.direction === "up" ? "↑" : change.direction === "down" ? "↓" : "-"} {change.value}%
          </span>
        </div>
      </div>
    )
  }

  const defaultRenderCell = (column: TableColumn, row: TableRowData) => {
    const value = row[column.key]

    if (!value) return null
    if (typeof value !== "object") {
      return <div>{value}</div>
    }

    return (
      <>
        <div>{value.formatted || value.value || ""}</div>
        {value.change && renderChangeIndicator(value.change)}
        {value.change &&
          renderSubRows(
            value.formatted || value.value || "",
            value.previous?.formatted || value.previous?.value || "",
            value.change,
          )}
      </>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-[#E0E0E0]">
      <div className="w-full" style={{ maxHeight: `${(maxRows + 1) * 8}rem` }}>
        <div className="overflow-auto" style={{ maxHeight: `${(maxRows + 1) * 8}rem` }}>
          <table className="w-full min-w-[800px] border-collapse">
            <thead className="sticky top-0 bg-white z-10 w-full">
              {groups && groups.length > 0 && (
                <tr className="border-b border-[#E0E0E0] bg-white">
                  <th className="p-3 text-left font-medium text-[#525252] sticky top-0 w-12"></th>
                  {groups.map((group, index) => (
                    <th
                      key={index}
                      colSpan={group.colSpan}
                      className={`p-3 text-center font-medium text-[#525252] sticky top-0 bg-white ${
                        group.borderLeft ? "border-l border-[#E0E0E0]" : ""
                      } ${group.borderRight ? "border-r border-[#E0E0E0]" : ""}`}
                    >
                      {group.title}
                    </th>
                  ))}
                </tr>
              )}
              <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5] sticky top-[${groups && groups.length > 0 ? '3.75rem' : '0'}]">
                <th className="p-3 text-left font-medium text-[#6F6F6F] sticky bg-[#F5F5F5] w-12"></th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    colSpan={column.colSpan || 1}
                    className={`p-3 text-${column.align || "left"} font-medium text-[#6F6F6F] sticky bg-[#F5F5F5] ${
                      column.width ? `w-[${column.width}]` : ""
                    } ${column.borderLeft ? "border-l border-[#E0E0E0]" : ""} ${
                      column.borderRight ? "border-r border-[#E0E0E0]" : ""
                    }`}
                  >
                    {column.key === "name" ? (
                      <div className="flex items-center">
                        {icon}
                        <span>{column.title}</span>
                      </div>
                    ) : column.showSortIcon ? (
                      <div className="flex items-center justify-end">
                        <span>{column.title}</span>
                        <ChevronDown size={14} className="ml-1" />
                      </div>
                    ) : (
                      column.title
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {tableData.map((row) => (
                <tr key={row.id} className={`border-b border-[#E0E0E0] ${isRowSelected(row.id) ? "bg-[#F5F5F5]" : ""}`}>
                  <td className="p-3 w-12">{renderCheckbox(row.id)}</td>
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${row.id}-${column.key}`}
                      className={`p-3 text-${column.align || "left"} ${
                        column.borderLeft ? "border-l border-[#E0E0E0]" : ""
                      } ${column.borderRight ? "border-r border-[#E0E0E0]" : ""}`}
                    >
                      {column.key === "name" ? (
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {row.logo && (
                              <img src={row.logo || "/placeholder.svg"} alt="" className="w-6 h-6 mr-2 rounded-sm" />
                            )}
                            <span className={`font-medium text-[#161616] ${column.key === "name" ? "underline" : ""}`}>
                              {row[column.key]?.text || row[column.key]}
                            </span>
                          </div>
                        </div>
                      ) : renderCell ? (
                        renderCell(column, row)
                      ) : (
                        defaultRenderCell(column, row)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {Object.keys(totals).length > 0 && (
              <tfoot className="sticky bottom-0 bg-white z-10">
                <tr className="border-t-2 border-[#E0E0E0] bg-[#F5F5F5]">
                  <td className="p-3 w-12"></td>
                  {columns.map((column, index) => (
                    <td
                      key={`total-${column.key}`}
                      className={`p-3 text-${column.align || "left"} font-bold text-[#161616] ${
                        column.borderLeft ? "border-l border-[#E0E0E0]" : ""
                      } ${column.borderRight ? "border-r border-[#E0E0E0]" : ""}`}
                    >
                      {column.key === "name" ? "Total" : totals[column.key]}
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

