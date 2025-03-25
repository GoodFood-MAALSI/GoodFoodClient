import { Module } from '@nestjs/common';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';
import { UserFavoriteRestaurantsController } from './user_favorite_restaurants.controller';
import { DatabaseModule } from 'src/database/databas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteRestaurant } from './entities/user_favorite_restaurant.entity';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([UserFavoriteRestaurant])],
  controllers: [UserFavoriteRestaurantsController],
  providers: [UserFavoriteRestaurantsService],
})
export class UserFavoriteRestaurantsModule {}
