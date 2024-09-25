import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.send.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
