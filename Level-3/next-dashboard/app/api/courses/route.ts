import { getCourses } from "@/lib/data"

export async function GET() {
    const courses = getCourses()
    return Response.json(courses)
}
