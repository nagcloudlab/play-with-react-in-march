import { Suspense } from "react"
import DashboardStats from "@/components/DashboardStats"
import RevenueChart from "@/components/RevenueChart"

export default function DashboardPage() {

    return (

        <div className="container">

            <h2 className="mb-4">Dashboard</h2>

            <Suspense fallback={<p>Loading stats...</p>}>
                <DashboardStats />
            </Suspense>

            <RevenueChart />

        </div>

    )

}
