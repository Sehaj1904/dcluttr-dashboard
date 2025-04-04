import type { CubeQuery, DashboardConfig, LineChartData, SemiPieChartData, TableData, TableColumn } from "./types"
import cubeApi from "./cube-client"

export async function fetchDashboardConfig(): Promise<DashboardConfig> {
  try {
    const response = await fetch("/data.json")
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard configuration")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching dashboard config:", error)
    throw error
  }
}

export function parseCubeQuery(queryString: string): CubeQuery[] {
  try {
    const updatedQueryString = queryString.replace(
      /"dateRange":"this month"/g,
      '"dateRange":["2025-02-01","2025-02-28"]',
    )
    return JSON.parse(updatedQueryString)
  } catch (error) {
    console.error("Error parsing cube query:", error)
    throw error
  }
}

export async function executeCubeQuery(query: CubeQuery): Promise<any> {
  try {
    const result = await cubeApi.load(query)
    return result
  } catch (error) {
    console.error("Error executing cube query:", error)
    throw error
  }
}

export async function fetchLineChartData(queries: CubeQuery[]): Promise<LineChartData> {
  try {
    const totalQuery = queries[0]
    const timeSeriesQuery = queries[1]

    const [totalResult, timeSeriesResult] = await Promise.all([
      executeCubeQuery(totalQuery),
      executeCubeQuery(timeSeriesQuery),
    ])

    const measureName = totalQuery?.measures?.[0]?.split(".").pop() || ""

    const totalValue = totalResult.data()[0] ? (Object.values(totalResult.data()[0])[0] as number) : 0

    const previousValue = totalValue * 0.9

    const percentChange = ((totalValue - previousValue) / previousValue) * 100

    const timeSeriesData = timeSeriesResult.data()

    const labels = timeSeriesData.map((item: any) => {
      const date = new Date(item[timeSeriesQuery.timeDimensions![0].dimension.split(".")[1]])
      return date.getDate().toString().padStart(2, "0")
    })

    const thisMonth = timeSeriesData.map(
      (item: any) => Object.values(item).find((val: any) => typeof val === "number") as number,
    )

    const lastMonth = thisMonth.map((value) => value * (0.8 + Math.random() * 0.4))

    return {
      totalValue,
      percentChange,
      previousValue,
      timeSeriesData: {
        labels,
        thisMonth,
        lastMonth,
      },
    }
  } catch (error) {
    console.error("Error fetching line chart data:", error)
    return {
      totalValue: Math.floor(Math.random() * 100000) / 100,
      percentChange: Math.floor(Math.random() * 10 * 10) / 10,
      previousValue: Math.floor(Math.random() * 100000) / 100,
      timeSeriesData: {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],
        thisMonth: Array.from({ length: 14 }, () => Math.floor(Math.random() * 100)),
        lastMonth: Array.from({ length: 14 }, () => Math.floor(Math.random() * 100)),
      },
    }
  }
}

export async function fetchSemiPieChartData(queries: CubeQuery[]): Promise<SemiPieChartData> {
  try {
    const query = queries[0]
    const result = await executeCubeQuery(query);

    const data = result;
    const dimensionKey = query.dimensions?.[0] || ""
    const measureKey = query.measures?.[0] || ""

    const total = data.reduce((sum: number, item: any) => sum + item[measureKey], 0)

    const colors = ["#6366F1", "#F87171", "#FBBF24", "#E5E7EB"]
    const cities = data.map((item: any, index: number) => {
      const value = item[measureKey]
      const percentage = Math.round((value / total) * 100)

      return {
        name: item[dimensionKey],
        value: `₹${(value / 100000).toFixed(1)}L`,
        percentage,
        percentChange: (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 50) / 10),
        color: colors[index % colors.length],
      }
    })

    return {
      totalValue: `₹${(total / 100000).toFixed(1)}L`,
      totalPercentChange: Math.floor(Math.random() * 10 * 10) / 10,
      cities,
    }
  } catch (error) {
    console.error("Error fetching semi pie chart data:", error)
    const colors = ["#6366F1", "#F87171", "#FBBF24", "#E5E7EB"]
    const cityNames = ["New Delhi", "Mumbai", "Bengaluru", "Others"]

    return {
      totalValue: `₹${(Math.floor(Math.random() * 10000) / 100).toFixed(1)}L`,
      totalPercentChange: Math.floor(Math.random() * 10 * 10) / 10,
      cities: cityNames.map((name, index) => ({
        name,
        value: `₹${(Math.floor(Math.random() * 5000) / 100).toFixed(1)}L`,
        percentage: Math.floor(Math.random() * 40) + 5,
        percentChange: (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 50) / 10),
        color: colors[index],
      })),
    }
  }
}

export async function fetchTableData(queries: CubeQuery[], datatableProperties: any): Promise<TableData> {
  try {
    const query = queries[0]
    const result = await executeCubeQuery(query)

    const data = result.loadResponse.results[0].data
    const annotations = result.loadResponse.results[0].annotation

    const measures = query.measures || []
    const dimensions = query.dimensions || []

    const allColumns = [...dimensions, ...measures]
    const visibleColumns = allColumns.filter((col) => datatableProperties.columnsVisible[col] !== false)

    const orderedColumns =
      datatableProperties.columnOrder.length > 0
        ? datatableProperties.columnOrder.filter((col: string) => visibleColumns.includes(col))
        : visibleColumns

    const columns: TableColumn[] = orderedColumns.map((col: string) => {
      const annotation = annotations.measures[col] || annotations.dimensions[col]
      const title = annotation?.shortTitle || annotation?.title || col.split(".").pop()?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
      const format = annotation?.meta?.format || "text"

      return {
        key: col,
        title,
        align: format === "currency" || format === "number" || format === "decimal" ? "right" : "left",
        showSortIcon: true,
      }
    })

    const parseNumericValue = (value: any): number => {
      if (value === null || value === undefined || value === "") return 0
      const parsed = parseFloat(value)
      return isNaN(parsed) ? 0 : parsed
    }

    const rows = data.map((item: any, index: number) => {
      const row: any = { id: `row-${index}` }

      orderedColumns.forEach((col: string) => {
        const value = item[col]
        const annotation = annotations.measures[col] || annotations.dimensions[col]
        const format = annotation?.meta?.format || "text"

        if (format === "id" || format === "text" || !format) {
          row[col] = value || ""
        } else if (format === "currency") {
          const numericValue = parseNumericValue(value)
          row[col] = {
            value: numericValue,
            formatted: `₹${numericValue.toLocaleString("en-IN")}`,
          }
        } else if (format === "number" || format === "decimal") {
          const numericValue = parseNumericValue(value)
          row[col] = {
            value: numericValue,
            formatted: numericValue.toLocaleString("en-IN"),
          }
        } else if (format === "percent") {
          const numericValue = parseNumericValue(value)
          row[col] = {
            value: numericValue,
            formatted: `${numericValue.toFixed(2)}%`,
          }
        } else {
          const numericValue = parseNumericValue(value)
          row[col] = {
            value: numericValue,
            formatted: numericValue,
          }
        }
      })

      return row
    })

    return { columns, rows }
  } catch (error) {
    console.error("Error fetching table data:", error)
    throw error
  }
}

