import * as dotEnv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

async function bootstrap() {
  dotEnv.config();

  const logFormat = format.printf(({ level, message, timestamp, context }) => {
    return `${timestamp} [${context}] ${level}: ${message}`;
  });

  const httpsOptions = {
    pfx: readFileSync(process.env.server_ssl_cert),
    passphrase: process.env.server_ssl_passphrase,
    requestCert: true,
    rejectUnauthorized: false
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: WinstonModule.createLogger({
      level: process.env.logger_level,
      format: format.combine(
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        logFormat,
        format.splat(),
      ),
      transports: [new transports.Console({
        handleExceptions: true
      })],
      exitOnError: false
    })
  });

  const config = new DocumentBuilder()
    .setTitle('Jobjack Assessment')
    .setDescription('Jobjack dir entry lister assessment')
    .setVersion('1.0.0')
    .addTag('assessment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  await app.listen(process.env.server_port);
}

bootstrap();
