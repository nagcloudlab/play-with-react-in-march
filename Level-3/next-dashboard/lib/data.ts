
declare global {
    var _courses: any[] | undefined
}
if (!global._courses) {
    global._courses = [
        { id: 1, name: "Next.js Fundamentals", instructor: "Nag" },
        { id: 2, name: "React Advanced", instructor: "Nag" },
        { id: 3, name: "Microservices Architecture", instructor: "Nag" },
        { id: 4, name: "Cloud Computing with AWS", instructor: "Nag" },
    ]
}
export const courses = global._courses!
export function getCourses() {
    return global._courses!
}
// add a new course
export function addCourse(course: any) {
    global._courses!.push(course)
}
// update a course 
export function updateCourse(id: number, updatedCourse: any) {
    const index = global._courses!.findIndex((course) => course.id === id)
    if (index !== -1) {
        global._courses![index] = { ...global._courses![index], ...updatedCourse }
    }
}
// delete a course 
export function deleteCourse(id: number) {
    global._courses = global._courses!.filter((course) => course.id !== id)
}

