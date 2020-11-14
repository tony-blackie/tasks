import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './task.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskEntity as Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException('Task with this id was not found');
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task(title, description, TaskStatus.OPEN);

        await task.save();

        return task;
    }

    async updateTaskStatus(id: number, status: TaskStatus) {
        const task = await this.getTaskById(id);

        task.status = status;

        await task.save();

        return task;
    }

    async getTasks({ status, search }: FilterTasksDto): Promise<Task[]> {
        const tasksQueryBuilder = this.taskRepository.createQueryBuilder(
            'task',
        );

        if (status) {
            tasksQueryBuilder.andWhere('task.status = :status', { status });
        }

        if (search) {
            tasksQueryBuilder.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%` },
            );
        }

        return await tasksQueryBuilder.getMany();
    }

    async deleteTask(id: number): Promise<Task> {
        const task = await this.getTaskById(id); //throw exception if task is not found

        task.remove();

        return task;
    }
}
