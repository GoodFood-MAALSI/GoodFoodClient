import { Module } from '@nestjs/common';
import { UserSearchHistoryService } from './user_search_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSearchHistory } from './entities/user_search_history.entity';
import { UsersModule } from 'src/domain/users/users.module';
import { UserSearchHistoryController } from './user_search_history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSearchHistory]),
    UsersModule,
  ],
  controllers: [UserSearchHistoryController],
  providers: [UserSearchHistoryService],
})
export class UserSearchHistoryModule {}