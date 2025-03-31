import { activateEmailTemplate } from "@/emails/activateEmailTemplate";
import { resetPasswordEmailTemplate } from "@/emails/reset-password-email-template";
import prisma from "@/lib/prisma";
import { subscribeConfirmation } from "@/emails/subscribeConfirmation";

const nodemailer = require("nodemailer");

export const sendEmail = async (userId, purpose) => {
  const Transport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "1998sieber@gmail.com",
      pass: process.env.APP_PW,
    },
  });

  // Find the user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  let mailOptions;
  let html;
  let verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify?token=${encodeURIComponent(user.unique_str)}&email=${encodeURIComponent(user.email)}`;
  let sender = "Anabel";

  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_API_URL}/the-turn/unsubscribe?token=${user.unsubscribe_token}`;

  if (purpose === "confirmation") {
    html = activateEmailTemplate(user.name, verifyUrl, unsubscribeUrl);
  } else if (purpose === "password-reset") {
    html = resetPasswordEmailTemplate(
      user.name,
      verifyUrl + "&reset=true",
      unsubscribeUrl
    );
  } else if (purpose === "subscribeConfirmation") {
    html = subscribeConfirmation(unsubscribeUrl);
  }

  let subject;

  if(purpose === "confirmation") {
    subject = "Verify your email";
  } else if(purpose === "subscribeConfirmation") {
    subject = "Subscription Confirmation";
  } else if(purpose === "password-reset") {
    subject = "Reset Password";
  }

  mailOptions = {
    from: sender,
    to: user.email,
    subject: subject,
    html: html,
  };

  Transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
    }
  });
};
