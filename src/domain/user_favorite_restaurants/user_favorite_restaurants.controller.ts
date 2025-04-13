import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';
import { CreateUserFavoriteRestaurantDto } from './dto/create-user_favorite_restaurant.dto';
import { UpdateUserFavoriteRestaurantDto } from './dto/update-user_favorite_restaurant.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-favorite-restaurants')
export class UserFavoriteRestaurantsController {
  constructor(private readonly userFavoriteRestaurantsService: UserFavoriteRestaurantsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserFavoriteRestaurantDto: CreateUserFavoriteRestaurantDto, @Request() req) {
    const userId = req.user.id;
    return this.userFavoriteRestaurantsService.create({ ...createUserFavoriteRestaurantDto, userId });
  }

  @Get()
  findAll() {
    return this.userFavoriteRestaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFavoriteRestaurantsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFavoriteRestaurantsService.remove(+id);
  }
}