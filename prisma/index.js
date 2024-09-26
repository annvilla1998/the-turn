import prisma from "../lib/prisma.js";

const users = [
  {
    name: "Daniel Gonzalez",
    email: "theturnvv@gmail.com",
    password: process.env.DEFAULT_PW,
    owner: true,
  },
];

async function main() {
  console.log("Seeding users...");
  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
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
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
