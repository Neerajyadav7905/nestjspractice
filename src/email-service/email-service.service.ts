import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailServiceService {
   constructor(private readonly mailerService: MailerService) {}
  
  async sendEmail(post:any) {
    try{
      let link = "www.google.com"
     let data =  await this.mailerService.sendMail({
        to: post.Email,
        subject: "Demo Email",
        text:"Verify your Email",
        html:`<!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f8f8f8;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              text-align: center;
              padding: 10px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            }
            .content {
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our Product Demo</h1>
            </div>
            <div class="content">
              <p>Curious about how our product can transform your business? Request a demo now and discover the seamless solutions we have in store for you.</p>
            <a href=${link}></a>
              </div>
          </div>
        </body>
        </html>
        `
      });
      console.log(data);
   }
   catch(e){
    console.log('error', e)
   }
  }
}
