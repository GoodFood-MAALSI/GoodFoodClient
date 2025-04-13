import { User } from 'src/domain/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserFavoriteRestaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurant_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.userFavoriteRestaurants)
  user: User;
}