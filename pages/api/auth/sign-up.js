import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import prisma from '@/lib/prisma';
import { createActivationToken } from '@/utils/tokens';
import { randString } from '@/utils/randString';

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: 'This email already exists.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters.' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        unique_str: randString(),
      },
    });

    res.json({ message: 'Regiser success!' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
