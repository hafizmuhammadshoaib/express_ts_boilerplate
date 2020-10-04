import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from './todo';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        length: 60,
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        length: 100,
        nullable: false
    })
    password: string

    @OneToMany(type => Todo, todo => todo.user)
    todo: Todo[];

}
