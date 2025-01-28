import { db } from "./db";

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
  });

  return alumni.map((alumnus) => ({
    id: alumnus.id,
    firstName: alumnus.firstName,
    lastName: alumnus.lastName,
    generation: alumnus.generation,
    linkedInURL: alumnus.linkedInURL || "No especificado",
    tfgTitle: alumnus.tfgTitle || "No especificado",
    tfgDescription: alumnus.tfgDescription || "No especificado",
    currentJob: alumnus.currentJob || "No especificado",
    internships: alumnus.internships.map((internshipAlumnus) => ({
      position: internshipAlumnus.internship.position || "No especificado",
      description: internshipAlumnus.internship.description || "No especificado",
      organization: internshipAlumnus.internship.organization.name || "No especificado",
      country: internshipAlumnus.internship.organization.country || "No especificado",
    })),
    masters: alumnus.masters.map((masterAlumnus) => ({
      name: masterAlumnus.master.name || "No especificado",
      description: masterAlumnus.master.description || "No especificado",
      universities: masterAlumnus.master.organizations
        .map((org) => org.organization.name || "No especificado")
        .join(", "),
      country: masterAlumnus.master.organizations[0]?.organization.country || "No especificado",
    })),
    projects: alumnus.projects.map((projectAlumnus) => ({
      name: projectAlumnus.project.name || "No especificado",
      description: projectAlumnus.project.description || "No especificado",
    })),
  }));
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
  });

  return alumniReviews.map((alumni) => ({
    id: alumni.id,
    firstName: alumni.firstName,
    lastName: alumni.lastName,
    generation: alumni.generation,
    review: alumni.review,
  }));
}

export type AlumniCardInfo = Awaited<
  ReturnType<typeof dbAlumniGetAllCardsInfo>
>[number];

export type AlumniReviewInfo = Awaited<
  ReturnType<typeof dbAlumniGetAllReviews>
>[number];
