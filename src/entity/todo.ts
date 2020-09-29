import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';


@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 25
    })
    title: string

    @Column({
        length: 250
    })
    item: string;


    @ManyToOne(type => User, user => user.todo, { nullable: false })
    user: User;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}
