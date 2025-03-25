import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFavoriteRestaurantDto } from './create-user_favorite_restaurant.dto';

export class UpdateUserFavoriteRestaurantDto extends PartialType(CreateUserFavoriteRestaurantDto) {}
