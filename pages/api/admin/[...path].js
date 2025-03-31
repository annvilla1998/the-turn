import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!isAdmin(session)) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const { path } = req.query;

  if (!path || path.length === 0) {
    return res.status(400).json({ error: "Invalid admin route" });
  }

  const route = path.join("/");

  switch (route) {
    case "users":
      if (req.method === "GET") {
        return getUsers(req, res);
      }
      break;
    case "user/delete":
      if (req.method === "DELETE") {
        return deleteUser(req, res);
      }
      break;
    default:
      return res.status(404).json({ error: "Route not found" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(400).json({ message: "Failed to fetch users" });
    }

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUser(req, res) {
    const { userId } = req.query;

    try {
      const deleteUser = await prisma.user.delete({
        where: {
            id: userId
        }
      });
  
      if (!deleteUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "User successfully deleted."
      });
    } catch (error) {
      console.error("Error deleting user:", error);
  
      return res.status(500).json({ message: "Internal server error" });
    }
  }