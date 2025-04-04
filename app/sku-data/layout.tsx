import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SKU Data | BlinkIt Analytics",
  description: "Analytics for all your SKUs",
}

export default function SkuDataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1 overflow-auto">{children}</main>
}

