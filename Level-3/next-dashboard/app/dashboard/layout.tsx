import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"

export default async function DashboardLayout({ children }: any) {

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (

        <div className="d-flex">

            <div className="bg-dark text-white p-3" style={{ width: "250px", height: "100vh" }}>
                <h4>Dev Dashboard</h4>

                <p className="text-muted small">Welcome, {session.user?.name}</p>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link text-white" href="/dashboard">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" href="/dashboard/courses">
                            Courses
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" href="/dashboard/users">
                            Users
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" href="/dashboard/courses/new">
                            Add Course
                        </Link>
                    </li>
                </ul>

                <LogoutButton />

            </div>

            <div className="p-4 flex-grow-1">
                {children}
            </div>

        </div>

    )

}
