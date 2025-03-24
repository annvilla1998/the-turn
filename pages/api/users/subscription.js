import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, subscribed } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        subscribed,
      },
    });

    return res.status(200).json({
      message: "Subscription updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
