import CourseSearch from "@/components/CourseSearch"

async function getCourses() {
    const res = await fetch("http://localhost:3000/api/courses", {
        cache: "no-store"
    })
    const courses = await res.json()
    return courses
}

export default async function CoursesPage() {
    const courses = await getCourses()
    return (
        <div className="container">
            <h2>Courses</h2>
            <CourseSearch courses={courses} />
        </div>
    )
}
