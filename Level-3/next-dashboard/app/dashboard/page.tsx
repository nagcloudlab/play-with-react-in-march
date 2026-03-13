import StatCard from "@/components/StatCard"

async function getDashboardStats() {
    return {
        users: 120,
        courses: 8,
        revenue: "$24,000",
        activeSessions: 32
    }
}

export default async function DashboardPage() {
    const stats = await getDashboardStats()
    return (
        <div className="container">
            <h2 className="mb-4">Dashboard</h2>
            <div className="row">
                <StatCard title="Users" value={stats.users} color="primary" />
                <StatCard title="Courses" value={stats.courses} color="success" />
                <StatCard title="Revenue" value={stats.revenue} color="warning" />
                <StatCard title="Active Sessions" value={stats.activeSessions} color="dark" />
            </div>
        </div>
    )
}
