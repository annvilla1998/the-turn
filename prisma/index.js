import { randString } from "../utils/randString.js";
import prisma from "../lib/prisma.js";
import { logError } from "../utils/logger.js";

const users = [
  {
    name: "Daniel Gonzalez",
    email: "theturnvv@gmail.com",
    password: process.env.DEFAULT_PW,
    unique_str: randString(),
    role: "admin"
  },
  {
    id: "7f0c3a11-aec0-4797-aad5-c3d79c1619e7",
    name: "Anabel",
    email: "villalobos1998@gmail.com",
    password: process.env.DEFAULT_PW,
    unique_str: randString(),
    role: "admin"
  }
];

async function main() {
  console.log("Seeding users...");
  for (const u of users) {
    const user = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id ${user.id}`);
  }
  console.log("Done seeding.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logError("Error seeing users", e);
    await prisma.$disconnect();
    process.exit(1);
  });
