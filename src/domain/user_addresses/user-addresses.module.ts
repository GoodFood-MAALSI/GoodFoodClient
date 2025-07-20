import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { UserAddressesController } from './user-addresses.controller';
import { UserAddress } from './entities/user-address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/domain/users/users.module';
import { IsEntityExistsConstraint } from '../utils/validators/is-entity-exists.validator';
import { HttpModule } from '@nestjs/axios';
import { InterserviceAuthGuard } from '../interservice/guards/interservice-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress]),
    UsersModule,
    HttpModule
  ],
  controllers: [UserAddressesController],
  providers: [IsEntityExistsConstraint, UserAddressesService, InterserviceAuthGuard],
})
export class UserAddressesModule {}