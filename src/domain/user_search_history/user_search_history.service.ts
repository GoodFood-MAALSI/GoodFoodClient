import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSearchHistory } from './entities/user_search_history.entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class UserSearchHistoryService {
  constructor(
    @InjectRepository(UserSearchHistory)
    private readonly userSearchHistoryRepository: Repository<UserSearchHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async checkSearchHistoryOwnership(
    searchHistoryId: number,
    userId: number,
  ): Promise<UserSearchHistory> {
    const userSearchHistory = await this.userSearchHistoryRepository.findOne({
      where: { id: searchHistoryId, userId },
    });
    if (!userSearchHistory) {
      throw new HttpException(
        "Vous n'êtes pas autorisé à accéder à cet historique de recherche ou il n'existe pas",
        HttpStatus.FORBIDDEN,
      );
    }
    return userSearchHistory;
  }

  async create(
    createSearchHistoryDto: CreateUserSearchHistoryDto,
    userId: number,
  ): Promise<UserSearchHistory> {
    const userSearchHistory = this.userSearchHistoryRepository.create({
      ...createSearchHistoryDto,
      userId, // Forcer l'utilisation de l'userId du client connecté
    });
    return await this.userSearchHistoryRepository.save(userSearchHistory);
  }

  async findOne(id: number, userId: number): Promise<UserSearchHistory> {
    return await this.checkSearchHistoryOwnership(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userSearchHistory = await this.checkSearchHistoryOwnership(id, userId);
    await this.userSearchHistoryRepository.remove(userSearchHistory);
  }

  async findByUser(userId: number): Promise<UserSearchHistory[]> {
    return await this.userSearchHistoryRepository.find({
      where: { userId },
    });
  }

  async removeAll(userId: number): Promise<void> {
    const searchHistories = await this.findByUser(userId);
    if (searchHistories.length === 0) {
      throw new NotFoundException("Aucun historique de recherche trouvé pour cet utilisateur");
    }
    await this.userSearchHistoryRepository.remove(searchHistories);
  }
}