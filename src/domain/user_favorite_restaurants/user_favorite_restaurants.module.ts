import { Module } from '@nestjs/common';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';
import { UserFavoriteRestaurantsController } from './user_favorite_restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteRestaurant } from './entities/user_favorite_restaurant.entity';
import { UsersModule } from 'src/domain/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFavoriteRestaurant]),
    UsersModule,
  ],
  controllers: [UserFavoriteRestaurantsController],
  providers: [UserFavoriteRestaurantsService],
})
export class UserFavoriteRestaurantsModule {}