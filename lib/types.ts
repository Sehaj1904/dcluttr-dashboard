// Dashboard configuration types
export interface DashboardConfig {
  id: string
  brandId: string
  name: string
  logo: string
  description: string
  active: boolean
  cards: CardConfig[]
}

export interface CardConfig {
  visualizationType: "linechart" | "semipiechart" | "table"
  title: string
  id: string
  logo: string
  description: string
  gridStackProperties: {
    x: number
    w: number
  }
  query: string
  datatableProperties: {
    columnOrder: string[]
    columnsPinned: string[]
    columnsVisible: Record<string, boolean>
  }
  active: boolean
}

// CubeJS query types
export interface CubeQuery {
  measures?: string[]
  dimensions?: string[]
  timeDimensions?: TimeDimension[]
  order?: Record<string, "asc" | "desc">
  limit?: number
}

export interface TimeDimension {
  dimension: string
  dateRange: string | string[]
  granularity?: "day" | "week" | "month" | "year"
}

// Response data types
export interface LineChartData {
  totalValue: number
  percentChange: number
  previousValue: number
  timeSeriesData: {
    labels: string[]
    thisMonth: number[]
    lastMonth: number[]
  }
}

export interface SemiPieChartData {
  totalValue: string
  totalPercentChange: number
  cities: {
    name: string
    value: string
    percentage: number
    percentChange: number
    color: string
  }[]
}

export interface TableData {
  columns: TableColumn[]
  rows: any[]
}

export interface TableColumn {
  key: string
  title: string
  align?: "left" | "right" | "center"
  width?: string
  showSortIcon?: boolean
  colSpan?: number
  borderLeft?: boolean
  borderRight?: boolean
}

