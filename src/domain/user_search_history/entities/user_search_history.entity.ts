import { Users } from "src/domain/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSearchHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    search_query: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Users, user => user.userSearchHistory) // Relation ManyToOne avec User
    user: Users;
}
