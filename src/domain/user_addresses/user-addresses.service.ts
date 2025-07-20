import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class UserAddressesService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async checkAddressOwnership(
    addressId: number,
    userId: number,
  ): Promise<UserAddress> {
    const userAddress = await this.userAddressRepository.findOne({
      where: { id: addressId, userId },
    });
    if (!userAddress) {
      throw new HttpException(
        "Vous n'êtes pas autorisé à accéder à cette adresse ou elle n'existe pas",
        HttpStatus.FORBIDDEN,
      );
    }
    return userAddress;
  }

  async create(
    createUserAddressDto: CreateUserAddressDto,
    userId: number,
  ): Promise<UserAddress> {
    const userAddress = this.userAddressRepository.create({
      ...createUserAddressDto,
      userId,
    });
    return await this.userAddressRepository.save(userAddress);
  }

  async findOne(id: number, userId: number): Promise<UserAddress> {
    return await this.checkAddressOwnership(id, userId);
  }

  async update(
    id: number,
    updateUserAddressDto: UpdateUserAddressDto,
    userId: number,
  ): Promise<UserAddress> {
    const userAddress = await this.checkAddressOwnership(id, userId);
    Object.assign(userAddress, updateUserAddressDto);
    return await this.userAddressRepository.save(userAddress);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userAddress = await this.checkAddressOwnership(id, userId);
    await this.userAddressRepository.remove(userAddress);
  }

  async findByUser(userId: number): Promise<UserAddress[]> {
    return await this.userAddressRepository.find({
      where: { userId },
    });
  }
}