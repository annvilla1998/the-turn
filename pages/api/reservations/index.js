import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";
import { logError } from "@/utils/logger";

const router = createRouter();

router.get(async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany();

    return res.status(200).json(reservations);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    logError("Error getting reservations", err.stack);
    res.status(err.statusCode || 500).end(err.message);
  }
});
