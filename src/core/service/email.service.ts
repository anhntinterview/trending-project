import nodemailer from 'nodemailer';
import { Service } from 'typedi';

@Service()
class EmailService {
  private mailOption;
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tuananh.nguyen.freedomwalking@gmail.com',
      pass: 'rfsjykanovjnubui'
    }
  });

  sendEmail(userEmail: string, subject: string, content: string) {
    this.mailOption = {
      from: 'tuananh.nguyen.freedomwalking@gmail.com',
      to: userEmail,
      subject: subject,
      text: content
    };
    this.transporter.sendMail(this.mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: `, +info.response);
      }
    });
  }
}

export default EmailService;
