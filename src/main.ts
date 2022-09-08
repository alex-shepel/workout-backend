import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;

const start = async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
