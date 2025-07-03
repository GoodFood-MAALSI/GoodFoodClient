import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/domain/utils/types/entity-condition.type';
import { NullableType } from 'src/domain/utils/types/nullable.type';
import { Session } from '../session/entities/session.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { FilterUsersDto } from './dtos/filter-users.dto';
import { UserAddress } from '../user_addresses/entities/user-address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(UserAddress)
    private readonly userAddressesRepository: Repository<UserAddress>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAllUsers(filterUsersDto: FilterUsersDto): Promise<{ users: User[]; total: number }> {
    const where: EntityCondition<User> = {};
    if (filterUsersDto?.status) {
      where.status = filterUsersDto.status;
    }

    const page = filterUsersDto.page || 1;
    const limit = filterUsersDto.limit || 10;
    const skip = (page - 1) * limit;

    try {
      const [users, total] = await this.usersRepository.findAndCount({
        where,
        order: {
          created_at: 'DESC',
        },
        skip,
        take: limit,
      });

      return { users, total };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Échec de la récupération des utilisateurs',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOneUser(options: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: options,
    });
  }

  updateUser(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async deleteUser(id: User['id']): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // TODO:Ajouter tout les liens au client
    await this.userAddressesRepository.delete({ user: { id } });
    await this.sessionRepository.delete({ user: { id } });
    await this.usersRepository.delete(id);

    return { message: "L'utilisateur a été supprimé avec succès" };
  }

  async suspendUser(id: User['id']): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }

    // Mettre à jour le statut de l'utilisateur
    await this.usersRepository.update(id, { status: UserStatus.Suspended });

    //TODO : A voir si on suspend tout ces avis
  }

  async restoreUser(id: User['id']): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }

    // Réactiver l'utilisateur
    await this.usersRepository.update(id, { status: UserStatus.Active });

    //TODO : A voir si on restore tout ces avis
  }

  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}