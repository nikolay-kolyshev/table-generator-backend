import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = +app.get(ConfigService).get('http.port') || 5000;
  await app.listen(PORT, () => {
    console.log('Service listening on PORT =', PORT);
  });
}
bootstrap();
