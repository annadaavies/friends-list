import { NestFactory } from '@nestjs/core';
import { friendModule } from './friend.module';

async function bootstrap() {
  const app = await NestFactory.create(friendModule);
  await app.listen(3000);
}
bootstrap();
