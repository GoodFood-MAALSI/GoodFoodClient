import { UserAddress } from 'src/domain/user_addresses/entities/user-address.entity';
import { UserFavoriteRestaurant } from 'src/domain/user_favorite_restaurants/entities/user_favorite_restaurant.entity';
import { UserSearchHistory } from 'src/domain/user_search_history/entities/user_search_history.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Users {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    phone: number;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserAddress, userAddress => userAddress.user)
    userAddress: UserAddress[];

    @OneToMany(() => UserSearchHistory, userSearchHistory => userSearchHistory.user)
    userSearchHistory: UserSearchHistory[];

    @OneToMany(() => UserFavoriteRestaurant, userFavoriteRestaurants => userFavoriteRestaurants.user)
    userFavoriteRestaurants: UserFavoriteRestaurant[];
  }