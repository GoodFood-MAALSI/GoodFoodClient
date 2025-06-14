import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityCondition } from "src/domain/utils/types/entity-condition.type";
import { NullableType } from "src/domain/utils/types/nullable.type";
import { Session } from "../session/entities/session.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserAddress } from "../user_addresses/entities/user-address.entity";

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
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findOneUser(options: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: options,
    });
  }

  updateUser(id: User["id"], payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async deleteUser(id: User["id"]): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    // TODO:Ajouter tout les liens au client
    await this.userAddressesRepository.delete({ user: { id } });
    await this.sessionRepository.delete({ user: { id } });
    await this.usersRepository.delete(id);

    return { message: "L'utilisateur a été supprimé avec succès" };
  }

  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}