import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteRestaurantsController } from './user_favorite_restaurants.controller';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';

describe('UserFavoriteRestaurantsController', () => {
  let controller: UserFavoriteRestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoriteRestaurantsController],
      providers: [UserFavoriteRestaurantsService],
    }).compile();

    controller = module.get<UserFavoriteRestaurantsController>(UserFavoriteRestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
