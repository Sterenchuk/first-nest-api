import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api/v0.1');
  app.enableCors(); // for all domains
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
