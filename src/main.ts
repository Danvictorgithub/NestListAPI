import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from "morgan"
import helmet from "helmet"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'))
  app.use(helmet())
  app.enableCors()
  await app.listen(8080);
}
bootstrap();
