import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(500).json({ message: "Missing token" });
    }

    // Find the user by token
    const user = await prisma.user.findUnique({
      where: { unsubscribe_token: token },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        subscribed: false,
      },
    });

    return res.status(200).json({
      message: "You have been unsubscribed.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
  }
}
