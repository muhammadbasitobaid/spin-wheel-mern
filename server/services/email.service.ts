import sgMail from "@sendgrid/mail";
const host = process.env.HOST;
const sendingEmail = process.env.SENDING_EMAIL;

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const createResetPasswordEmail = (
  receiverEmail: string,
  resetTokenValue: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Reset password link",
    text: "Some useless text",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h1 style="">Spin Wheel App</h1>
        <h2 style="color: #2e6c80;">Reset Your Password</h2>
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <a href="${host}/login/reset/${resetTokenValue}" style="color: #1a73e8; text-decoration: none;">${host}/login/reset/${resetTokenValue}</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Thank you,<br/>The Team</p>
      </div>
    `,
  };

  return email;
};

export const createResetConfirmationEmail = (
  receiverEmail: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Your password has been changed",
    text: "Some useless text",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h1 style="">Spin Wheel App</h1>
        <h2 style="color: #2e6c80;">Password Changed</h2>
        <p>This is a confirmation that the password for your account <strong>${receiverEmail}</strong> has just been changed.</p>
        <p>If you did not make this change, please contact our support immediately.</p>
        <p>Thank you,<br/>The Team</p>
      </div>
    `,
  };

  return email;
};

export const createVerificationEmail = (
  receiverEmail: string,
  verificationTokenValue: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Email Verification",
    text: "Some useless text",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #2e6c80;">Verify Your Email</h2>
        <p>Please verify your account by clicking the link below:</p>
        <a href="${host}/account/confirm/${verificationTokenValue}" style="color: #1a73e8; text-decoration: none;">${host}/account/confirm/${verificationTokenValue}</a>
        <p>If you did not create an account using this email address, please ignore this email.</p>
        <p>Thank you,<br/>The Team</p>
      </div>
    `,
  };

  return email;
};

export const sendEmail = async (email: sgMail.MailDataRequired) => {
  await sgMail.send(email);
};

export default {
  createResetPasswordEmail,
  createResetConfirmationEmail,
  createVerificationEmail,
  sendEmail,
};
