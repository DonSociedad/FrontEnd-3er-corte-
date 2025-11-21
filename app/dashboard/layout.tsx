import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  )
}