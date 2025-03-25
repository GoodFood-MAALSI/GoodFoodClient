import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';
import { UpdateUserSearchHistoryDto } from './dto/update-user_search_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSearchHistory } from './entities/user_search_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSearchHistoryService {
  constructor(
        @InjectRepository(UserSearchHistory)
        private readonly userSearchHistoryRepository: Repository<UserSearchHistory>,
      ) {}
    
      async create(createuserSearchHistoryDto: CreateUserSearchHistoryDto) {
        const userSearchHistory = this.userSearchHistoryRepository.create(createuserSearchHistoryDto)
        return await this.userSearchHistoryRepository.save(userSearchHistory);
      }
    
      async findAll() {
        return await this.userSearchHistoryRepository.find();
      }
    
      async findOne(id: number) {
        return await this.userSearchHistoryRepository.findOne({ where: {id}});
      }
    
      async update(id: number, updateUserSearchHistoryDto: UpdateUserSearchHistoryDto) {
    
        const userSearchHistory = await this.findOne(id);
    
        if(!userSearchHistory){
          throw new NotFoundException();
        }
    
        Object.assign(userSearchHistory,updateUserSearchHistoryDto);
        return await this.userSearchHistoryRepository.save(userSearchHistory);
      }
    
      async remove(id: number) {
        const userSearchHistory = await this.findOne(id);
    
        if(!userSearchHistory){
          throw new NotFoundException();
        }
        return await this.userSearchHistoryRepository.remove(userSearchHistory);
      }
}
