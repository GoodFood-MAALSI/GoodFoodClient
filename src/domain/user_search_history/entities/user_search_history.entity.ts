import { User } from 'src/domain/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserSearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  search_query: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
