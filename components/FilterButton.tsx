"use client"

import { ChevronDown } from "lucide-react"
import { theme } from "../theme"

interface FilterButtonProps {
  count: number
  onClick?: () => void
}

export default function FilterButton({ count, onClick }: FilterButtonProps) {
  return (
    <button
      className="flex items-center justify-between px-4 py-2 rounded-md text-white"
      style={{ backgroundColor: theme.colors.primary }}
      onClick={onClick}
    >
      <span className="font-medium">Filters({count})</span>
      <ChevronDown size={16} className="ml-2" />
    </button>
  )
}

