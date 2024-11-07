import { activateEmailTemplate } from '@/emails/activateEmailTemplate';

const nodemailer = require('nodemailer');

export const sendEmail = (name, email, uniqueString) => {
  const Transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: '1998sieber@gmail.com',
      pass: process.env.APP_PW,
    },
  });

  let mailOptions;
  let verifyUrl = `http://localhost:3000/api/auth/verify?token=${encodeURIComponent(uniqueString)}&email=${encodeURIComponent(email)}`;
  let sender = 'Anabel';
  mailOptions = {
    from: sender,
    to: email,
    subject: 'Verify your email',
    html: activateEmailTemplate(name, verifyUrl, ''),
  };

  Transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent');
    }
  });
};
