import { Calendar } from "lucide-react"

interface DateRangePickerProps {
  startDate: string
  endDate: string
  onSelect?: (startDate: string, endDate: string) => void
}

export default function DateRangePicker({
  startDate = "Aug 01, 024",
  endDate = "Aug 03, 2024",
  onSelect,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center bg-[#F5F5F5] py-2 px-4 rounded-full border border-[#E0E0E0] cursor-pointer">
      <Calendar size={18} className="text-[#161616] mr-3" />
      <span className="text-[#161616] text-sm font-medium">
        {startDate} - {endDate}
      </span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3">
        <path d="M4 6L8 10L12 6" stroke="#6F6F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

