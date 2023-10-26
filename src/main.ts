import { NestFactory } from '@nestjs/core';
import { friendModule } from './friend.module';

async function bootstrap() {
  const app = await NestFactory.create(friendModule);
  await app.listen(3001);
}
bootstrap();

/**
 * Hi Anna, this is Horace. You are doing a great job for the task.
 * This task actually let you have a taste of writing a server script in Nestjs.
 * It sharpen your problem solving skillwhen you are going to use some new language,
 * tool or framework to build something.
 * I am happy to see your trial !! I write some comments for the .ts files. You can take a look.
 * You also can connect a real mongoDB with this project if you want. Hope you enjoy it !
 */
