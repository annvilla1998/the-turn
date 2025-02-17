import { activateEmailTemplate } from '@/emails/activateEmailTemplate';
import { resetPasswordEmailTemplate } from '@/emails/reset-password-email-template';

const nodemailer = require('nodemailer');

export const sendEmail = (name, email, uniqueString, purpose) => {
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
  let html;
  let verifyUrl = `http://localhost:3000/api/auth/verify?token=${encodeURIComponent(uniqueString)}&email=${encodeURIComponent(email)}`;
  let sender = 'Anabel';

  if(purpose === "confirmation") {
    html = activateEmailTemplate(name, verifyUrl, '');
  } else if (purpose === "password-reset") {
    html = resetPasswordEmailTemplate(name, verifyUrl + "&reset=true", '');
  }

  mailOptions = {
    from: sender,
    to: email,
    subject: 'Verify your email',
    html: html,
  };

  Transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent');
    }
  });
};
