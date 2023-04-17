import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { JWT_REFRESH_TOKEN_COOKIE_KEY } from '@/auth/auth.constants';
import { LoggerService } from '@/common/logger/logger.service';

const LOGGER_CONTEXT = 'app';

async function bootstrap() {
  /** [app] init */
  const app = await NestFactory.create(AppModule);
  /** [logger] init */
  const logger = await app.resolve(LoggerService);
  /** [logger] set global context */
  logger.globalContext = LOGGER_CONTEXT;
  /** [app] cookie parser init */
  app.use(cookieParser());
  /** [swagger] DocumentBuilder configuration */
  const config = new DocumentBuilder()
    .setTitle('Генератор таблиц')
    .setDescription('API для генератора таблиц')
    .setVersion('0.0.0')
    .addTag('table-generator')
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'JWT',
      name: 'Access JWT token',
      scheme: 'bearer',
      description:
        'Access JWT token отдается сервером в теле ответа на аутентификацию и подставляется фронтом в заголовок Authentication (спорный момент с точки зрения безопасности) и быстро экспайрится, как правило фронт хранит его в одном из локальных хранилищ (localSto после экспайра Вы можете обновить его, воспользовавшись Refresh JWT токеном.',
    })
    .addCookieAuth(JWT_REFRESH_TOKEN_COOKIE_KEY, {
      type: 'apiKey',
      bearerFormat: 'JWT',
      name: 'Refresh JWT token',
      scheme: 'bearer',
      description:
        'Refresh JWT token подставляется сервером в HttpOnly Cookie и отправляется с каждым запросом фронта (тоже спорный момент с точки зрения безопасности, иногда используют подход "ровно наоборот") и экспайрится долго, после экспайра клиенту возвращается Unauthorized Http Status Code (401)',
    })
    .build();
  /** [swagger] DocumentOptions configuration */
  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  /** [swagger] SwaggerModule document init */
  const document = SwaggerModule.createDocument(app, config, documentOptions);
  /** [swagger] SwaggerModule setup */
  SwaggerModule.setup('docs', app, document);
  /** [config] get port */
  const PORT = +app.get(ConfigService).get('http.port') || 5000;
  /** [app] listening service */
  await app.listen(PORT, async () => {
    logger.success(`Service listening on PORT = ${PORT}`);
    logger.log(`Environment = ${process.env.NODE_ENV}`);
  });
}
bootstrap();
