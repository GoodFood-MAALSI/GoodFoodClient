import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './domain/utils/interceptors/response.interceptor';
import { AllExceptionsFilter } from './domain/utils/filters/http-exception.filter';
import { useContainer } from 'class-validator';

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
    }),
  );

  // Format des réponses/exceptions
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription("Documentation de l'API NestJS avec Swagger")
    .setVersion('1.0')
    .addTag("App", "Point d'entrée de l'api")
    .addTag("Auth", "Gestion de l'authentification : connexion, inscription, confirmation d'email, réinitialisation de mot de passe, rafraîchissement de token et déconnexion")
    .addTag("Users", "Gestion des utilisateurs : récupération, mise à jour et suppression définitive")
    .addTag("UserSearchHistory", "Gestion de l'historique des recherches des utilisateurs : création, récupération et suppression des recherches effectuées")
    .addTag("UserAddresses", "Gestion des adresses des utilisateurs : création, récupération, mise à jour et suppression des adresses")
    .addTag("UserFavoriteRestaurants", "Gestion des restaurants favoris des utilisateurs : ajout, récupération et suppression des restaurants préférés")
    .addTag("Reviews", "Gestion des avis des utilisateurs : création, récupération, mise à jour et suppression des reviews")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  document.servers = [
    {
      url: '{host}',
      description: 'Dynamic Server URL',
      variables: {
        host: {
          default: process.env.BACKEND_DOMAIN,
          description: 'Host of the API (replace with your IP or domain)',
        },
      },
    },
  ];

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();