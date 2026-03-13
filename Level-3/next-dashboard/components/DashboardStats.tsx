import StatCard from "./StatCard"

async function getDashboardStats() {

    // Simulate slow API call (remove in production)
    await new Promise(r => setTimeout(r, 2000))

    return {
        users: 120,
        courses: 8,
        revenue: "$24,000",
        sessions: 32
    }

}

export default async function DashboardStats() {

    const stats = await getDashboardStats()

    return (

        <div className="row">

            <StatCard title="Users" value={stats.users} color="primary" />
            <StatCard title="Courses" value={stats.courses} color="success" />
            <StatCard title="Revenue" value={stats.revenue} color="warning" />
            <StatCard title="Sessions" value={stats.sessions} color="dark" />

        </div>

    )

}
