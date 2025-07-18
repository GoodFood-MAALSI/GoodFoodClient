import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './domain/utils/interceptors/response.interceptor';
import { AllExceptionsFilter } from './domain/utils/filters/http-exception.filter';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { UserSeeder } from './database/seeders/user.seeder';
import { UserAddressSeeder } from './database/seeders/user-adresses.seeder';
import { UserSearchHistorySeeder } from './database/seeders/user-search-history.seeder';
import * as fs from 'fs/promises';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Activer CORS avec les bonnes options
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Pipe de validation global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      forbidNonWhitelisted: true,
    }),
  );

  // Format des réponses/exceptions
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Client Documentation')
    .setDescription("Documentation de l'API Client NestJS avec Swagger")
    .setVersion('1.0')
    .addServer(process.env.BACKEND_DOMAIN, 'Local dev')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Exécuter les seeders en environnement de développement si nécessaire
  if (process.env.NODE_ENV === 'development' && process.env.RUN_SEEDERS === 'true') {
    const seedFilePath = join(__dirname, '.seeded');
    let hasBeenSeeded = false;

    // Vérifier si le fichier .seeded existe
    try {
      await fs.access(seedFilePath);
      hasBeenSeeded = true;
      console.log('Seeders already executed, skipping...');
    } catch {
      // Le fichier n'existe pas, les seeders n'ont pas encore été exécutés
      hasBeenSeeded = false;
    }

    if (!hasBeenSeeded) {
      console.log('Running database seeders for client API...');
      const dataSource = app.get(DataSource);
      try {
        await runSeeders(dataSource, {
          seeds: [
            UserSeeder,
            UserAddressSeeder,
            UserSearchHistorySeeder,
          ],
        });
        console.log('Seeders executed successfully for client API.');

        // Créer le fichier .seeded pour marquer l'exécution
        await fs.writeFile(seedFilePath, 'Seeded on ' + new Date().toISOString());
      } catch (error) {
        console.error('Error running seeders for client API:', error);
        throw error;
      }
    }
  }

  await app.listen(process.env.APP_PORT);
}

bootstrap();