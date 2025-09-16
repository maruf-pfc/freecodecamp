import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
  console.log(`Server Listening on PORT ${process.env.PORT || 5000}`);
  console.log(
    `Click here to visit: http://localhost:${process.env.PORT || 5000}`,
  );
}
bootstrap();
