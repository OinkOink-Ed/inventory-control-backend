import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExeptionFilter } from './common/filters/AllExeptionFilter';
import { AuthModule } from './Modules/auth/auth.module';
import { CartridgeModule } from './Modules/cartridge/cartridge.module';

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

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, CartridgeModule],
  });
  SwaggerModule.setup('api', app, document, {});

  await app.listen(process.env.PORT);
}
bootstrap();
