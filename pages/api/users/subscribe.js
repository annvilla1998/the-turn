import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        subscribed: true,
        unsubscribe_token: crypto.randomBytes(32).toString("hex"),
      },
    });
    
    if (updatedUser) {
      try {
        await sendEmail(userId, "subscribeConfirmation");
        res
        .status(200)
        .json({
          message:
          "A message has been sent to your email with instructions to reset your password.",
        });
      } catch (e) {
        res.status(500).json({ message: "Failed to send email." });
      }
    }

    return res.status(200).json({
      message: "User successfully subscribed!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error subscribing:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
