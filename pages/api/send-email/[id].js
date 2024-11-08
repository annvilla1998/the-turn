import prisma from '@/lib/prisma';
import { sendEmail } from '@/utils/sendEmail';

export default async function handler(req, res) {
  const { id } = req.query;

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  try {
    sendEmail(user.name, user.email, user.unique_str);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to send email.' });
  }
}
