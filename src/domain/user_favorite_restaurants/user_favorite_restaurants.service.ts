import { Injectable } from '@nestjs/common';
import { CreateUserFavoriteRestaurantDto } from './dto/create-user_favorite_restaurant.dto';
import { UpdateUserFavoriteRestaurantDto } from './dto/update-user_favorite_restaurant.dto';

@Injectable()
export class UserFavoriteRestaurantsService {
  create(createUserFavoriteRestaurantDto: CreateUserFavoriteRestaurantDto) {
    return 'This action adds a new userFavoriteRestaurant';
  }

  findAll() {
    return `This action returns all userFavoriteRestaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userFavoriteRestaurant`;
  }

  update(id: number, updateUserFavoriteRestaurantDto: UpdateUserFavoriteRestaurantDto) {
    return `This action updates a #${id} userFavoriteRestaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFavoriteRestaurant`;
  }
}
