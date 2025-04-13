import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { UserAddressesController } from './user-addresses.controller';
import { UserAddress } from './entities/user-address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/domain/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress]),
    UsersModule,
  ],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}