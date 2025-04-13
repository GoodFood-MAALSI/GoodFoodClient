import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserFavoriteRestaurantDto } from './dto/create-user_favorite_restaurant.dto';
import { UpdateUserFavoriteRestaurantDto } from './dto/update-user_favorite_restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFavoriteRestaurant } from './entities/user_favorite_restaurant.entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class UserFavoriteRestaurantsService {
  constructor(
    @InjectRepository(UserFavoriteRestaurant)
    private readonly userFavoriteRestaurantRepository: Repository<UserFavoriteRestaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserFavoriteRestaurantDto: CreateUserFavoriteRestaurantDto,
  ): Promise<UserFavoriteRestaurant> {
    const { userId, restaurant_id } = createUserFavoriteRestaurantDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const favoriteRestaurant = this.userFavoriteRestaurantRepository.create({
      restaurant_id,
      user, 
    });
    return await this.userFavoriteRestaurantRepository.save(favoriteRestaurant);
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
