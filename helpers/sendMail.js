const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Cổng bảo mật (SSL)
        secure: true, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email, 
          subject: subject, 
          //text: "Hello world?", 
          html: html, 
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
}