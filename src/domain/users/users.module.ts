import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Session } from '../session/entities/session.entity';
import { UserAddress } from '../user_addresses/entities/user-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session, UserAddress]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    TypeOrmModule.forFeature([User]),
    UsersService,
  ],
})
export class UsersModule {}