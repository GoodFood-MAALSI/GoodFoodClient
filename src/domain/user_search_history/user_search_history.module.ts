import { Module } from '@nestjs/common';
import { UserSearchHistoryService } from './user_search_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSearchHistory } from './entities/user_search_history.entity';
import { UsersModule } from 'src/domain/users/users.module';
import { UserSearchHistoryController } from './user_search_history.controller';
import { HttpModule } from '@nestjs/axios';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSearchHistory]),
    UsersModule,
    HttpModule
  ],
  controllers: [UserSearchHistoryController],
  providers: [UserSearchHistoryService, InterserviceAuthGuard],
})
export class UserSearchHistoryModule {}