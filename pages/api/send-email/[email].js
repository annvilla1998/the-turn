import prisma from '@/lib/prisma';
import { sendEmail } from '@/utils/sendEmail';

export default async function handler(req, res) {
  const { email, purpose } = req.query;

  const user = await prisma.user.findFirst({
    where: {
      email
    },
  });

  if(!user) {
    return res.status(404).json({ message: 'User does not exist.' });
  }

  try {
    await sendEmail(user.id, purpose);
    res.status(200).json({ message: 'A message has been sent to your email with instructions to reset your password.' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to send email.' });
  }
}