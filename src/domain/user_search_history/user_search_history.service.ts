// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserSearchHistoryDto } from './dto/create-user_search_history.dto';
// import { UpdateUserSearchHistoryDto } from './dto/update-user_search_history.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserSearchHistory } from './entities/user_search_history.entity';
// import { Repository } from 'typeorm';
// import { User } from 'src/domain/users/entities/user.entity';

// @Injectable()
// export class UserSearchHistoryService {
//   constructor(
//     @InjectRepository(UserSearchHistory)
//     private readonly userSearchHistoryRepository: Repository<UserSearchHistory>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async create(createUserSearchHistoryDto: CreateUserSearchHistoryDto, userId: number): Promise<UserSearchHistory> {
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('Utilisateur non trouvé');
//     }

//     const userSearchHistory = this.userSearchHistoryRepository.create({
//       ...createUserSearchHistoryDto,
//       user,
//     });
//     return await this.userSearchHistoryRepository.save(userSearchHistory);
//   }

//   async findAll(): Promise<UserSearchHistory[]> {
//     return await this.userSearchHistoryRepository.find({ relations: ['user'] });
//   }

//   async findOne(id: number): Promise<UserSearchHistory> {
//     const userSearchHistory = await this.userSearchHistoryRepository.findOne({
//       where: { id },
//       relations: ['user'],
//     });
//     if (!userSearchHistory) {
//       throw new NotFoundException('Historique de recherche non trouvé');
//     }
//     return userSearchHistory;
//   }

//   async remove(id: number): Promise<void> {
//     const userSearchHistory = await this.findOne(id);
//     await this.userSearchHistoryRepository.remove(userSearchHistory);
//   }
// }