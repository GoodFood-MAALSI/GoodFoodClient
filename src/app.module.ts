import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/databas.module';
import { UsersModule } from './domain/users/users.module';
import { UserAddressesModule } from './domain/user_addresses/user-addresses.module';
import { UserSearchHistoryModule } from './domain/user_search_history/user_search_history.module';
import { UserFavoriteRestaurantsModule } from './domain/user_favorite_restaurants/user_favorite_restaurants.module';
import { ReviewsModule } from './domain/reviews/reviews.module';

@Module({
  imports: [DatabaseModule,UsersModule,UserAddressesModule,UserSearchHistoryModule,UserFavoriteRestaurantsModule,ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
