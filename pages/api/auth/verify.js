import { createRouter } from 'next-connect';
import prisma from '@/lib/prisma';

const router = createRouter();

router.get(async (req, res) => {
  try {
    const { token, email } = req.query;

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

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });

    res.status(200).json({ message: 'Verification success!' });
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
