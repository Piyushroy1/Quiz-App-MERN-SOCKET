import { IMailOptions } from "./email.types";
import nodemailer from "nodemailer";

export const sendMail = async (mailCreds: IMailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "piyushroychowdhury2000@gmail.com",
        pass: "gfceldifgfcdxxdo",
      },
      tls: { rejectUnauthorized: false },
    });
    const {to , subject , emailData} = mailCreds;
    const mailOptions = {
      from: "piyushroychowdhury2000@gmail.com",
      to,
      subject,
      text: emailData
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    throw new Error("EMAIL CANNOT BE SENT");
  }
};
