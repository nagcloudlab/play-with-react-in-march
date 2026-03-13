import { PrismaClient } from "@prisma/client/scripts/default-index.js"

const prisma = new PrismaClient()

async function main() {

    await prisma.course.createMany({
        data: [
            { name: "Next.js Fundamentals", instructor: "Admin" },
            { name: "React Advanced", instructor: "Admin" },
            { name: "Microservices Architecture", instructor: "Admin" },
            { name: "Node.js Backend", instructor: "Admin" },
            { name: "DevOps CI/CD", instructor: "Admin" },
            { name: "Docker Essentials", instructor: "Admin" },
            { name: "Kubernetes Basics", instructor: "Admin" },
            { name: "System Design", instructor: "Admin" },
            { name: "Distributed Systems", instructor: "Admin" },
            { name: "API Security", instructor: "Admin" },
            { name: "Cloud Architecture", instructor: "Admin" },
            { name: "Performance Engineering", instructor: "Admin" }
        ]
    })

    console.log("Seed data created")

}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
