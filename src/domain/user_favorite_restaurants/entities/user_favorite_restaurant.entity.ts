import { User } from 'src/domain/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserFavoriteRestaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurant_id: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}