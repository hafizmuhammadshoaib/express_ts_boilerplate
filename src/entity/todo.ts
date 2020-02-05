import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}
