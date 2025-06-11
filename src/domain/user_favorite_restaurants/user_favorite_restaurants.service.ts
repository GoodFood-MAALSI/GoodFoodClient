import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserFavoriteRestaurantDto } from './dto/create-user_favorite_restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFavoriteRestaurant } from './entities/user_favorite_restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserFavoriteRestaurantsService {
  constructor(
    @InjectRepository(UserFavoriteRestaurant)
    private readonly userFavoriteRestaurantRepository: Repository<UserFavoriteRestaurant>,
  ) {}

  async create(createFavoriteDto: CreateUserFavoriteRestaurantDto & { userId: number }) {
    const { userId, ...favoriteData } = createFavoriteDto;

    const restaurant = this.userFavoriteRestaurantRepository.create({
      ...favoriteData,
      userId,
    });

    return await this.userFavoriteRestaurantRepository.save(restaurant);
  }

  async findAll(): Promise<UserFavoriteRestaurant[]> {
    return await this.userFavoriteRestaurantRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<UserFavoriteRestaurant> {
    const favoriteRestaurant =
      await this.userFavoriteRestaurantRepository.findOne({
        where: { id },
        relations: ['user'],
      });
    if (!favoriteRestaurant) {
      throw new NotFoundException('Restaurant favori non trouvé');
    }
    return favoriteRestaurant;
  }

  async remove(id: number): Promise<void> {
    const favoriteRestaurant = await this.findOne(id);
    await this.userFavoriteRestaurantRepository.remove(favoriteRestaurant);
  }
}
