import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: process.env.CLIENT_SERVER,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  }));


  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('A Todo App created using Nestjs framework')
    .setVersion('1.0')
    .addTag('todo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);
  await app.listen(3000);
}
bootstrap();
