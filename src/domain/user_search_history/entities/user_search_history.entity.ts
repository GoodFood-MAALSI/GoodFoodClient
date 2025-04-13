import { User } from 'src/domain/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSearchHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    search_query: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.userSearchHistory)
    user: User;
}