import { db } from "./db"

export async function dbAlumniGetAllCardsInfo() {
  const alumni = await db.alumni.findMany({
    include: {
      internships: {
        include: {
          internship: {
            include: {
              organization: true, // Detalles de la organización
            },
          },
        },
      },
      masters: {
        include: {
          master: {
            include: {
              organizations: {
                include: {
                  organization: true, // Detalles de las organizaciones
                },
              },
            },
          },
        },
      },
      projects: {
        include: {
          project: true, // Detalles de los proyectos personales
        },
      },
    },
  })

  // FIXME: This looks a little too cumbersome...
  // ... maybe solve it in the query?
  // ... or walk the structure and subsitute all "undefined"s for "No especificat"?
  return alumni.map((alumnus) => ({
    id: alumnus.id,
    firstName: alumnus.firstName,
    lastName: alumnus.lastName,
    generation: alumnus.generation,
    linkedInURL: alumnus.linkedInURL || "No especificat",
    tfgTitle: alumnus.tfgTitle || "No especificat",
    tfgDescription: alumnus.tfgDescription || "No especificat",
    tfgUniversity: alumnus.tfgUniversity || "No especificat",
    tfgCountry: alumnus.tfgCountry || "No especificat",

    currentJob: alumnus.currentJob || "No especificat",
    currentSituation: alumnus.currentSituation || "No especificat",
    currentOrganization: alumnus.currentOrganization || "No especificat",
    currentPosition: alumnus.currentPosition || "No especificat",
    currentJobDescription: alumnus.currentJobDescription || "No especificat",
    currentJobRelatedToGCED: alumnus.currentJobRelatedToGCED || "No especificat",
    currentJobKeywordsDomain: alumnus.currentJobKeywordsDomain || "No especificat",
    currentJobKeywordsSpecialty: alumnus.currentJobKeywordsSpecialty || "No especificat",

    internships: alumnus.internships.map((internshipAlumnus) => ({
      position: internshipAlumnus.internship.position || "No especificat",
      description: internshipAlumnus.internship.description || "No especificat",
      organization: internshipAlumnus.internship.organization.name || "No especificat",
      country: internshipAlumnus.internship.organization.country || "No especificat",
    })),
    masters: alumnus.masters.map((masterAlumnus) => ({
      name: masterAlumnus.master.name || "No especificat",
      description: masterAlumnus.master.description || "No especificat",
      universities: masterAlumnus.master.organizations
        .map((org) => org.organization.name || "No especificat")
        .join(", "),
      country: masterAlumnus.master.organizations[0]?.organization.country || "No especificat",
    })),
    projects: alumnus.projects.map((projectAlumnus) => ({
      name: projectAlumnus.project.name || "No especificat",
      description: projectAlumnus.project.description || "No especificat",
    })),
  }))
}

export async function dbAlumniGetAllReviews() {
  const alumniReviews = await db.alumni.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      generation: true,
      review: true,
    },
    where: {
      review: {
        not: null,
      },
    },
  })

  return alumniReviews.map((alumni) => ({
    id: alumni.id,
    firstName: alumni.firstName,
    lastName: alumni.lastName,
    generation: alumni.generation,
    review: alumni.review,
  }))
}

export async function dbUniversityProjectsGetAll() {
  const uniProjects = await db.universityProject.findMany()

  return uniProjects.map((project) => ({
    id: project.id,
    name: project.name,
    summary: project.summary,
    description: project.description,
    topic: project.topic,
    tags: project.tags,
    images: project.images,
  }))
}

export type AlumniCardInfo = Awaited<ReturnType<typeof dbAlumniGetAllCardsInfo>>[number]

export type AlumniReviewInfo = Awaited<ReturnType<typeof dbAlumniGetAllReviews>>[number]

export type UniversityProjectInfo = Awaited<ReturnType<typeof dbUniversityProjectsGetAll>>[number]
