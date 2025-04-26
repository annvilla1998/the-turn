import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isAdmin } from "@/lib/auth";
import { sendEmail } from "@/utils/sendEmail";
import { IncomingForm } from "formidable";
import path from "path";
import prisma from "@/lib/prisma";
import { logError } from "@/utils/logger";

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
    case "send-newsletter":
      if (req.method === "POST") {
        return sendNewsletter(req, res);
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

export const config = {
  api: {
    bodyParser: false
  }
};

const uploadDir = path.join(process.cwd(), "/public/uploads");

async function sendNewsletter(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const subscribedUsers = await prisma.user.findMany({
    where: {
      subscribed: true
    }
  });

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      logError("Upload Error", err);
      return res.status(500).json({ message: "Upload error" });
    }
    const [caption] = fields.caption;
    const [subjectMessage] = fields.subjectMessage;
    const file = files.file?.[0] || files.file;

    if (!file || !subjectMessage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${path.basename(file.filepath)}`;

    try {
      if (!subscribedUsers.length) {
        return res.status(404).json({ message: "No subscribed users" });
      }

      await sendEmail({
        users: subscribedUsers,
        purpose: "newsletter",
        subjectMessage,
        imageUrl,
        caption
      });

      return res.status(200).json({
        message: "Successfully sent newsletter to all subscribed users."
      });
    } catch (error) {
      logError("Error fetching users:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  });
}

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      users
    });
  } catch (error) {
    logError("Error fetching users:", error);

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
    logError("Error deleting user:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
}
