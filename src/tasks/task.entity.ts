import { User } from 'src/auth/user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task.types';

@Entity()
export class TaskEntity extends BaseEntity {
    constructor(title: string, description: string, status: TaskStatus) {
        super();

        this.title = title;
        this.description = description;
        this.status = status;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(user => User, user => user.tasks, { eager: false })
    user: User;
}
