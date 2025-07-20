import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Session } from '../session/entities/session.entity';
import { UserAddress } from '../user_addresses/entities/user-address.entity';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session, UserAddress]), HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, InterserviceAuthGuard],
  exports: [
    TypeOrmModule.forFeature([User]),
    UsersService,
  ],
})
export class UsersModule {}