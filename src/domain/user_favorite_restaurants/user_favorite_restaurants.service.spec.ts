import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteRestaurantsService } from './user_favorite_restaurants.service';

describe('UserFavoriteRestaurantsService', () => {
  let service: UserFavoriteRestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoriteRestaurantsService],
    }).compile();

    service = module.get<UserFavoriteRestaurantsService>(UserFavoriteRestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
