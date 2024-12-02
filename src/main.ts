import * as process from 'node:process';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.CLIENT_URL, 'http://localhost:3000'],

      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Upwork Bidder')
    .setDescription('Upwork Bidding AI-powered assistant')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const PORT = parseInt(process.env.PORT) ?? 8000;
  await app.listen(PORT, () => Logger.log(`Server started on port = ${PORT}`));
}
bootstrap();
