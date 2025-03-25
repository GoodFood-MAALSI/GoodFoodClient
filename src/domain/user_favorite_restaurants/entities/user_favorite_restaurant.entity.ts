import { Users } from "src/domain/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserFavoriteRestaurant {
        @CreateDateColumn()
        createdAt: Date;

        @ManyToOne(() => Users, user => user.userFavoriteRestaurants) // Relation ManyToOne avec User
        user: Users;
}
