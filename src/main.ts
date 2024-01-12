import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
  .setTitle('CURD')
  .setDescription('CURD operations')
  .setVersion('1.0')
  .addTag('curd')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
app.enableCors();
app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  prefix: '/uploads',
});
SwaggerModule.setup('api', app, document);
  await app.listen(8081);
}
bootstrap();
