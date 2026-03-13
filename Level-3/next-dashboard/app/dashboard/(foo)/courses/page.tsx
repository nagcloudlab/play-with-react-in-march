import { courses } from "@/lib/data"
import Link from "next/link"

export default async function CoursesPage({ searchParams }: any) {

    const params = await searchParams
    const page = Number(params.page) || 1
    const limit = 5
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedCourses = courses.slice(start, end)
    const totalPages = Math.ceil(courses.length / limit)

    return (

        <div className="container">
            <h2>Courses</h2>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course</th>
                        <th>Instructor</th>
                    </tr>
                </thead>

                <tbody>

                    {paginatedCourses.map((course: any) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.instructor}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

            <div className="mt-3">
                {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1
                    return (
                        <Link
                            key={pageNumber}
                            href={`/dashboard/courses?page=${pageNumber}`}
                            className={`btn btn-sm me-2 ${pageNumber === page ? "btn-primary" : "btn-outline-primary"
                                }`}
                        >
                            {pageNumber}
                        </Link>

                    )
                })}

            </div>

        </div>

    )

}