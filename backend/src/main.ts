import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.fillter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT, () => {
    console.log(`server is listen on ${process.env.PORT}`);
  });
}
bootstrap();
