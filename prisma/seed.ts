import { PrismaClient } from "@prisma/client"

// Will pick DATABASE_URL from .env
const db = new PrismaClient()

const johndoe = await db.alumni.create({
    data: {
        firstName: "John",
        lastName: "Doe",
        linkedInURL: "https://www.linkedin.com/in/johndoe",
        generation: 0,
        review: "Laboris cillum quis excepteur amet dolor pariatur commodo culpa culpa cillum veniam ex deserunt. Proident aute sint cillum consectetur aliquip ullamco ad nisi deserunt. Ullamco duis adipisicing veniam aliquip ex esse nostrud duis. Elit id officia dolore anim reprehenderit dolor occaecat ad do ullamco duis laborum. Aliqua elit exercitation sunt quis reprehenderit aliquip labore id. Ut culpa qui sunt aute exercitation aliqua.",
        tfgTitle: "Exercitation aute fugiat exercitation cillum.",
        tfgDescription:
            "Id laborum ullamco enim qui ipsum laborum officia exercitation consectetur deserunt velit aliqua do. Irure fugiat quis consequat voluptate ipsum. Mollit aute sit consectetur amet nisi qui consectetur adipisicing pariatur Lorem aliquip id. Sunt incididunt labore reprehenderit sunt do ea. Quis amet consectetur qui tempor excepteur commodo elit commodo irure excepteur ullamco sit deserunt. Eu deserunt nisi consequat eiusmod magna magna pariatur ea sint.",
    },
})

const google = await db.organization.create({
    data: {
        name: "Google",
        city: "Mountain View",
        country: "USA",
        description:
            "Google is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
    },
})

const google_internship = await db.internship.create({
    data: {
        organization: { connect: google },
        position: "Software Engineer",
        description:
            "Software engineers at Google are researchers and developers who yearn to create and implement complex computer science solutions. Our engineers develop massively scalable, distributed software systems and also collaborate on multitudes of smaller projects that have universal appeal - which requires research, awareness, interactivity, and asking questions.",
    },
})

await db.internshipAlumni.create({
    data: {
        alumni: { connect: johndoe },
        internship: { connect: google_internship },
    },
})
