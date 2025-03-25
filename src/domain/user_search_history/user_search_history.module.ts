import { Module } from '@nestjs/common';
import { UserSearchHistoryService } from './user_search_history.service';
import { UserSearchHistoryController } from './user_search_history.controller';

@Module({
  controllers: [UserSearchHistoryController],
  providers: [UserSearchHistoryService],
})
export class UserSearchHistoryModule {}
