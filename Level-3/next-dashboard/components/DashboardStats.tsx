import { Suspense } from "react"
import StatCard from "./StatCard"


async function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                users: 120
            })
        }, 2000)
    })
}

async function getCourses() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                courses: 8
            })
        }, 3000)
    })
}

async function getRevenue() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                revenue: "$24,000"
            })
        }, 8000)
    })
}

async function getSessions() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                sessions: 32
            })
        }, 5000)
    })
}

async function UserStat() {
    const resp = await getUsers();
    const { users } = resp as any
    return <StatCard title="Users" value={users} color="primary" />
}

async function CourseStat() {
    const resp = await getCourses();
    const { courses } = resp as any
    return <StatCard title="Courses" value={courses} color="success" />
}

async function RevenueStat() {
    const resp = await getRevenue();
    const { revenue } = resp as any
    return <StatCard title="Revenue" value={revenue} color="warning" />
}

async function SessionStat() {
    const resp = await getSessions();
    const { sessions } = resp as any
    return <StatCard title="Sessions" value={sessions} color="dark" />
}


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

function CardSkeleton() {
    return (
        <div className="col-md-3 mb-4">
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default async function DashboardStats() {
    //const stats = await getDashboardStats()
    return (
        <div className="row">
            {/* <StatCard title="Users" value={stats.users} color="primary" />
            <StatCard title="Courses" value={stats.courses} color="success" />
            <StatCard title="Revenue" value={stats.revenue} color="warning" />
            <StatCard title="Sessions" value={stats.sessions} color="dark" /> */}

            <Suspense fallback={<CardSkeleton />}>
                <UserStat />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
                <CourseStat />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
                <RevenueStat />
            </Suspense>

            <Suspense fallback={<CardSkeleton />}>
                <SessionStat />
            </Suspense>

        </div>
    )
}
