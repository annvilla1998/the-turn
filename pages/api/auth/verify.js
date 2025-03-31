
import { createRouter } from 'next-connect';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

const router = createRouter();

router.get(async (req, res) => {
  try {
    const { token, email, reset } = req.query;
    console.log(token, email)

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        unique_str: token,
      },
    });

    if (!user) {
      res.status(400).send({
        message:
          'Verification unsuccessful. No user has been found with this unique id.',
      });
      return;
    }

    if (reset) {
      res.status(200).redirect(`/the-turn/reset/${bcrypt.hashSync(token, 10)}?email=${email}`);
    } else {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          verified: true,
        },
      });

      // Pass a verified flag to confirm this came from the verification endpoint
      res.status(200).redirect(`/the-turn/verification-confirmation?verified=true&token=${token}&email=${email}`);
    }
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