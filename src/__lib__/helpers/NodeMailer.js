import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    port: process.env.PORT,
    host: process.env.HOST,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.APP_PASSWORD,
    },
    secure: true,
  })

export async function sendMail(mailData) {
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info)
    })
}