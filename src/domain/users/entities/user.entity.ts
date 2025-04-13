import {
  Column,
  AfterLoad,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { EntityHelper } from "src/domain/utils/entity-helper";
import { Exclude } from "class-transformer";
import { hashPassword } from "src/domain/utils/helpers";
import { UserSearchHistory } from "src/domain/user_search_history/entities/user_search_history.entity";
import { UserAddress } from "src/domain/user_addresses/entities/user-address.entity";
import { UserFavoriteRestaurant } from "src/domain/user_favorite_restaurants/entities/user_favorite_restaurant.entity";
import { Review } from "src/domain/reviews/entities/review.entity";

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      this.password = await hashPassword(this.password);
    }
  }

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.Inactive })
  status: UserStatus;

  @Index()
  @Column({ type: String, nullable: true })
  first_name: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  last_name: string | null;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserSearchHistory, (userSearchHistory) => userSearchHistory.user)
  userSearchHistory: UserSearchHistory[];

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddresses: UserAddress[];

  @OneToMany(() => UserFavoriteRestaurant, (userFavoriteRestaurant) => userFavoriteRestaurant.user)
  userFavoriteRestaurants: UserFavoriteRestaurant[];

  @OneToMany(() => Review, (review) => review.get_user)
  reviews: Review[];
}