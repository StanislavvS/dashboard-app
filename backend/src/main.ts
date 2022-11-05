import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000, () => {
    console.log(`server is listen on 5000`);
  });
}
bootstrap();
