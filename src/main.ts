import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { AllExceptionFilter } from '@common/filters/AllExeptionFilter';
import { CreateKabinetEventType } from '@Modules/events/types/CreateKabinetEventType';
import { DecomissioningCartrdigeEventType } from '@Modules/events/types/DecomissioningCartrdigeEventType';
import { DeliveryCartridgeEventType } from '@Modules/events/types/DeliveryCartridgeEventType';
import { MovementCartridgeEventType } from '@Modules/events/types/MovementCartridgeEventType';
import { ReceivingCartridgeEventType } from '@Modules/events/types/ReceivingCartridgeEventType';
import { UpdateUserEventType } from '@Modules/events/types/UpdateUserEventType';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionFilter());
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
    extraModels: [
      CreateKabinetEventType,
      DecomissioningCartrdigeEventType,
      DeliveryCartridgeEventType,
      MovementCartridgeEventType,
      ReceivingCartridgeEventType,
      UpdateUserEventType,
    ],
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT!);
}
bootstrap();
