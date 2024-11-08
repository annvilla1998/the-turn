import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  const user = await prisma.user.findFirst({
    where: {
      email: id,
    },
  });

  res.status(200).json(user);
}
