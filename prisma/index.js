import { randString } from '../utils/randString.js';
import prisma from '../lib/prisma.js';

const users = [
  {
    name: 'Daniel Gonzalez',
    email: 'theturnvv@gmail.com',
    password: process.env.DEFAULT_PW,
    unique_str: randString(),
    role: "admin",
  },
  {
    id: "7f0c3a11-aec0-4797-aad5-c3d79c1619e7",
    name: 'Test',
    email: 'villalobos1998@gmail.com',
    password: 'test',
    unique_str: randString(),
  },
];

const reservations = [
  {
    user_id: "7f0c3a11-aec0-4797-aad5-c3d79c1619e7",
    date: new Date(2024, 11, 1),
    service_time: 1,
    time: '10:00 am',
    payment_status: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function main() {
  console.log('Seeding users...');
  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id ${user.id}`);
  }
  console.log('Done seeding.');

  console.log('Seeding reservations...');
  for (const r of reservations) {
    const reservation = await prisma.reservation.create({
      data: r,
    });
    console.log(`Created reservation with id ${reservation.id}`);
  }
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
