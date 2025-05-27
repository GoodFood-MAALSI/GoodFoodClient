import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './domain/users/users.module';
import { AuthModule } from './domain/auth/auth.module';
import { SessionModule } from './domain/session/session.module';
import { MailerModule } from './domain/mailer/mailer.module';
import { MailsModule } from './domain/mails/mails.module';
import { ForgotPasswordModule } from './domain/forgot-password/forgot-password.module';
import { UserSearchHistoryModule } from './domain/user_search_history/user_search_history.module';
import { UserAddressesModule } from './domain/user_addresses/user-addresses.module';
import { UserFavoriteRestaurantsModule } from './domain/user_favorite_restaurants/user_favorite_restaurants.module';
import { ReviewsModule } from './domain/reviews/reviews.module';
import { DatabaseModule } from './database/databas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    SessionModule,
    MailerModule,
    MailsModule,
    ForgotPasswordModule,
    UsersModule,
    UserSearchHistoryModule,
    UserAddressesModule,
    UserFavoriteRestaurantsModule,
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
