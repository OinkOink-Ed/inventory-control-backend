import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { AllExeptionFilter } from '@common/filters/AllExeptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new AllExeptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Inventory Control')
    .setDescription('The Inventory Control API description')
    .setVersion('1.0')
    .addTag('Inventory Control GP')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document, {});

  await app.listen(process.env.PORT);
}
bootstrap();
