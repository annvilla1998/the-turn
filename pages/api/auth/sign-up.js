import { createRouter } from "next-connect";
import { validateEmail } from "@/utils/validation";
import { sendEmail } from "@/utils/sendEmail";
import prisma from "@/lib/prisma";
import { randString } from "@/utils/randString";
import { logError } from "@/utils/logger";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This account already exists. Please sign in." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const randStr = randString();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        unique_str: randStr
      }
    });

    try {
      await sendEmail({ user: newUser, purpose: "confirmation" });
      return res.status(200).json({
        message: "Register success! Confirmation email sent.",
        newUser
      });
    } catch (emailError) {
      logError("Email send error:", emailError);
      return res.status(200).json({
        message: "Register success, but failed to send confirmation email.",
        emailError: emailError.message
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    logError("Error registering user", err.stack);
    res.status(err.statusCode || 500).end(err.message);
  }
});
