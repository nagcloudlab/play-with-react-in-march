import DashboardStats from "@/components/DashboardStats"
import StatCard from "@/components/StatCard"
import { Suspense } from "react"

async function getDashboardStats() {
    return {
        users: 120,
        courses: 8,
        revenue: "$24,000",
        activeSessions: 32
    }
}

export default async function DashboardPage() {

    // similuate a delay
    //await new Promise((resolve) => setTimeout(resolve, 2000))

    const stats = await getDashboardStats()

    return (
        <div className="container">
            <h2 className="mb-4">Dashboard</h2>
            <div className="row">
                <Suspense fallback={<p>Loading stats...</p>}>
                    <DashboardStats />
                </Suspense>
            </div>
        </div>
    )
}
