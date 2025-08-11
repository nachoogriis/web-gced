import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

// Will pick DATABASE_URL from .env
const db = new PrismaClient()

// Number of fake data to generate
const NUM_SAMPLES = 23

// Create as many fake alumni as specified in NUM_SAMPLES
for (let i = 0; i < NUM_SAMPLES; i++) {
  // Variables
  const firstNameAlumni = faker.person.firstName()
  const lastNameAlumni = faker.person.lastName()

  const alumniSample = await db.alumni.create({
    data: {
      firstName: firstNameAlumni,
      lastName: lastNameAlumni,
      linkedInURL: `https://www.linkedin.com/in/${firstNameAlumni.toLowerCase()}${lastNameAlumni.toLowerCase()}`,
      generation: faker.number.int({ min: 2017, max: 2023 }),
      review: faker.lorem.sentence({ min: 30, max: 50 }),
      tfgTitle: faker.lorem.sentence({ min: 5, max: 12 }),
      tfgDescription: faker.lorem.sentence({ min: 20, max: 40 }),
      tfgUniversity: faker.company.name(),
      currentJob: faker.lorem.sentence({ min: 5, max: 10 }),
    },
  })

  const organizationInternshipSample = await db.organization.create({
    data: {
      name: faker.company.name(),
      city: faker.location.city(),
      country: faker.location.country(),
    },
  })

  const internshipSample = await db.internship.create({
    data: {
      organization: { connect: organizationInternshipSample },
      position: faker.lorem.sentence({ min: 2, max: 5 }),
      description: faker.lorem.sentence({ min: 10, max: 20 }),
    },
  })

  await db.internshipAlumni.create({
    data: {
      alumni: { connect: alumniSample },
      internship: { connect: internshipSample },
    },
  })

  const organizationMasterSample = await db.organization.create({
    data: {
      name: faker.company.name(),
      city: faker.location.city(),
      country: faker.location.country(),
    },
  })

  const masterSample = await db.master.create({
    data: {
      name: faker.lorem.sentence({ min: 3, max: 7 }),
    },
  })

  await db.masterAlumni.create({
    data: {
      alumni: { connect: alumniSample },
      master: { connect: masterSample },
    },
  })

  await db.masterOrganizations.create({
    data: {
      master: { connect: masterSample },
      organization: { connect: organizationMasterSample },
    },
  })
}
