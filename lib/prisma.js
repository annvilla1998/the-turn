"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

// Load environment variables from .env.development if in development mode
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.development" });
}

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends({
    query: {
      // Middleware to encrypt user password
      user: {
        $allOperations({ operation, args, query }) {
          if (
            ["create", "update"].includes(operation) &&
            args.data["password"]
          ) {
            args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
          }
          return query(args);
        }
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
