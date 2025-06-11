import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';
import { CreateUserFavoriteRestaurantDto } from './dto/create-user_favorite_restaurant.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from 'node_modules/@nestjs/swagger';
import { Request } from 'express';

@Controller('user-favorite-restaurants')
export class UserFavoriteRestaurantsController {
  constructor(private readonly userFavoriteRestaurantsService: UserFavoriteRestaurantsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateUserFavoriteRestaurantDto })
  async create(
    @Body() createUserFavoriteRestaurantDto: CreateUserFavoriteRestaurantDto,
    @Req() req: Request,
  ) {
    try {
      const user = req.user;
      if (!user || !user.id) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const createdFavorite = await this.userFavoriteRestaurantsService.create({
        ...createUserFavoriteRestaurantDto,
        userId: user.id,
      });

      return createdFavorite;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to add favorite',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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