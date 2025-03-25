import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';
import { CreateUserFavoriteRestaurantDto } from './dto/create-user_favorite_restaurant.dto';
import { UpdateUserFavoriteRestaurantDto } from './dto/update-user_favorite_restaurant.dto';

@Controller('user-favorite-restaurants')
export class UserFavoriteRestaurantsController {
  constructor(private readonly userFavoriteRestaurantsService: UserFavoriteRestaurantsService) {}

  @Post()
  create(@Body() createUserFavoriteRestaurantDto: CreateUserFavoriteRestaurantDto) {
    return this.userFavoriteRestaurantsService.create(createUserFavoriteRestaurantDto);
  }

  @Get()
  findAll() {
    return this.userFavoriteRestaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFavoriteRestaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFavoriteRestaurantDto: UpdateUserFavoriteRestaurantDto) {
    return this.userFavoriteRestaurantsService.update(+id, updateUserFavoriteRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFavoriteRestaurantsService.remove(+id);
  }
}
