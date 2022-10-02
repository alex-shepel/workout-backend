import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 5000;

const start = async () => {
  const app = await NestFactory.create(AppModule);

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
