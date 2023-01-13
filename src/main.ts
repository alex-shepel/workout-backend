import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';

if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

const PORT = process.env.PORT || 5000;

const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Workout')
    .setDescription('The API documentation of the workout manager application')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
