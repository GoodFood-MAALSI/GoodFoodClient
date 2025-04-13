import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(
    createUserAddressDto: CreateUserAddressDto,
  ): Promise<UserAddress> {
    const { userId, ...addressData } = createUserAddressDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const userAddress = this.userAddressRepository.create({
      ...addressData,
      user,
    });
    return await this.userAddressRepository.save(userAddress);
  }

  async findAll(): Promise<UserAddress[]> {
    return await this.userAddressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<UserAddress> {
    const userAddress = await this.userAddressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!userAddress) {
      throw new NotFoundException('Adresse non trouvée');
    }
    return userAddress;
  }

  async update(
    id: number,
    updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<UserAddress> {
    const userAddress = await this.findOne(id);
    Object.assign(userAddress, updateUserAddressDto);
    return await this.userAddressRepository.save(userAddress);
  }

  async remove(id: number): Promise<void> {
    const userAddress = await this.findOne(id);
    await this.userAddressRepository.remove(userAddress);
  }
}
