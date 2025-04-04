import SkuDashboard from "@/components/SkuDashboard"
import FilterButton from "@/components/FilterButton"

export default function SkuDataPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <FilterButton count={1} />
      </div>
      <SkuDashboard />
    </div>
  )
}

