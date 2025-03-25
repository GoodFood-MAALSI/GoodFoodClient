import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}
