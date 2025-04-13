import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config(); // Charge le fichier .env en tout début

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS avec les bonnes options
  app.enableCors({
    origin: [process.env.FRONTEND_DOMAIN],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  
  // Pipe de validation global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger configuration
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
    .addServer(process.env.BACKEND_DOMAIN, 'Local dev')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  // Démarrage du serveur
  await app.listen(process.env.APP_PORT);
}

bootstrap();