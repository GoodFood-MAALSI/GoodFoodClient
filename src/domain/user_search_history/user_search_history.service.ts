import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async create(
    createSearchHistoryDto: CreateUserSearchHistoryDto & { userId: number },
  ): Promise<UserSearchHistory> {
    const { userId, ...searchHistoryData } = createSearchHistoryDto;

    const userSearchHistory = this.userSearchHistoryRepository.create({
      ...searchHistoryData,
      userId,
    });
    return await this.userSearchHistoryRepository.save(userSearchHistory);
  }

  async findOne(id: number): Promise<UserSearchHistory> {
    const userSearchHistory = await this.userSearchHistoryRepository.findOne({
      where: { id },
    });
    if (!userSearchHistory) {
      throw new NotFoundException('Historique non trouvée');
    }
    return userSearchHistory;
  }

  async remove(id: number): Promise<void> {
    const userSearchHistory = await this.findOne(id);
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
      throw new NotFoundException('Aucun historique de recherche trouvé pour cet utilisateur');
    }
    await this.userSearchHistoryRepository.remove(searchHistories);
  }
}