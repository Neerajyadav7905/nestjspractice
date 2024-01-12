import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurdModule } from './curd/curd.module';
import { AuthModule } from './auth/auth.module';
import { EmailServiceModule } from './email-service/email-service.module';

@Module({
  imports: [CurdModule, AuthModule, EmailServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
