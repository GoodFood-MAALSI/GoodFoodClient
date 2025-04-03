import { Users } from "src/domain/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserFavoriteRestaurant {
        @PrimaryGeneratedColumn()
            id: number;
        
        @Column()
        restaurant_id: number;

        @CreateDateColumn()
        createdAt: Date;

        @ManyToOne(() => Users, user => user.userFavoriteRestaurants) // Relation ManyToOne avec User
        user: Users;
}
