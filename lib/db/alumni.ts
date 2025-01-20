import { db } from "./db";

export async function dbAlumniGetAllCardsInfo() {
  // TODO: Sort by date
  const alumni = await db.alumni.findMany({
    include: {
      internships: {
        include: { internship: { select: { position: true, organization: { select: { name: true } } } } },
      },
      masters: {
        include: { master: { select: { name: true } } },
      },
    },
  });

  return alumni.map((alumni) => ({
    id: alumni.id,
    firstName: alumni.firstName,
    lastName: alumni.lastName,
    generation: alumni.generation,
    tfgTitle: alumni.tfgTitle,
    internships: alumni.internships.map((internship) => ({
      position: internship.internship.position,
      organization: internship.internship.organization.name,
    })),
    masters: alumni.masters.map((master) => ({ name: master.master.name })),
  }));
}

export type AlumniCardInfo = Awaited<
  ReturnType<typeof dbAlumniGetAllCardsInfo>
>[number];
