import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { logError } from "@/utils/logger";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        email: id
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    logError("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
