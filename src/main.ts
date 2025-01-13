import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/userDto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Inventory Control')
    .setDescription('The Inventory Control API description')
    .setVersion('1.0')
    .addTag('Inventory Control GP')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [UserDto]
  });
  SwaggerModule.setup('api', app, document, {

  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,

  }));
  await app.listen(process.env.PORT);
}
bootstrap();