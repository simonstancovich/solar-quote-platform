import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
  });

  //Global validation to reduce bugs and enforce DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Baibai stuff not in the DTO
      forbidNonWhitelisted: false,
      transform: true, //Auto transform payloads to DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Solar Quote Platform API')
    .setDescription('API for demo solar quote platform')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
