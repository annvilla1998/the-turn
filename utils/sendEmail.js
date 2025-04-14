import EmailVerificationTemplate from "@/components/emails/EmailVerificationTemplate";
import ResetPasswordEmailTemplate from "@/components/emails/ResetPasswordEmailTemplate";
import SubscribeConfirmation from "@/components/emails/SubscribeConfirmation";
import NewsletterTemplate from "@/components/emails/NewsletterTemplate";
import { Resend } from "resend";
import { logError } from "./logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const defaultArgs = {
  from: "The Turn <theturn@theturnvv.com>"
};

export const sendEmail = async ({
  user,
  purpose,
  users,
  subjectMessage,
  caption,
  imageUrl
}) => {
  if (purpose === "newsletter") {
    let emailArgs = [];
    for (const user of users) {
      emailArgs.push({
        ...defaultArgs,
        to: [user.email],
        subject: subjectMessage,
        react: NewsletterTemplate({
          unsubscribeUrl: `${process.env.NEXT_PUBLIC_API_URL}/the-turn/unsubscribe?token=${user.unsubscribe_token}`,
          caption,
          imageUrl
        })
      });
    }

    await sendNewsletterEmail(emailArgs);

    return;
  }

  let verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify?token=${encodeURIComponent(user.unique_str)}&email=${encodeURIComponent(user.email)}`;

  if (purpose === "confirmation") {
    if (!user) {
      throw new Error("User not found while sending confirmation.");
    }

    await sendSingleEmail({
      ...defaultArgs,
      to: [user.email],
      subject: "Verify your email",
      react: EmailVerificationTemplate({
        userName: user.name,
        url: verifyUrl
      })
    });

    return;
  }

  if (purpose === "password-reset") {
    await sendSingleEmail({
      ...defaultArgs,
      to: [user.email],
      subject: "Reset Password",
      react: ResetPasswordEmailTemplate({
        userName: user.name,
        url: verifyUrl + "&reset=true"
      })
    });

    return;
  }

  if (purpose === "subscribe-confirmation") {
    await sendSingleEmail({
      ...defaultArgs,
      to: [user.email],
      subject: "Subscription Confirmation",
      react: SubscribeConfirmation({
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_API_URL}/the-turn/unsubscribe?token=${user.unsubscribe_token}`
      })
    });

    return;
  }
};

const sendNewsletterEmail = async (emailArgs) => {
  const { data, error } = await resend.batch.send(emailArgs);

  if (error) {
    logError("Failed to send newsletter emails.", error);
    throw new Error("Failed to send newsletter emails.");
  }

  if (data) {
    return data;
  }
};

const sendSingleEmail = async (emailArgs) => {
  const { data, error } = await resend.emails.send(emailArgs);

  if (error) {
    logError("Failed to send email:", error);
    throw new Error("Failed to send email.");
  }

  if (data) {
    return data;
  }
};
