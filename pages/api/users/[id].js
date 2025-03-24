import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        email: id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}