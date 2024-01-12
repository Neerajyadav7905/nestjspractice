import { Module } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { EmailServiceController } from './email-service.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        // port: 587,
        // secure: false,
        auth: {
          user: 'devtestmail9999@gmail.com',
          pass: 'ooqxudaifmwhqyyu',
        },
      },
      defaults: {
        from: '"No Reply" <testemailphpdev@gmail.com>',
      },
    }),
  ],
  controllers: [EmailServiceController],
  providers: [EmailServiceService]
})
export class EmailServiceModule {}
