import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";
import { logError } from "@/utils/logger";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { newPassword } = req.body;
    const email = req.headers.referer.split("=")[1];

    if (!newPassword) {
      return res.status(400).json({ message: "Please enter a new password." });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "Failed. The user couldn't be found." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({ message: "This user does not exist." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        password: newPassword
      }
    });

    if (updatedUser) {
      return res.status(200).json({ message: "Password reset success!" });
    } else {
      return res.status(400).json({ message: "Password reset failed." });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    logError("Error resetting password", err.stack);
    res.status(err.statusCode || 500).end(err.message);
  }
});
