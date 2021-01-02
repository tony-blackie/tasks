import { Injectable, NotFoundException } from '@nestjs/common'

import { TaskStatus } from './task.types'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskEntity as Task } from './task.entity'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../auth/user.entity'
import { query } from 'express'

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id, userId: user.id },
        })

        if (!task) {
            throw new NotFoundException('Task with this id was not found')
        }

        return task
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto

        const task = new Task(title, description, TaskStatus.OPEN, user)

        await task.save()

        delete task.user

        return task
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User) {
        const task = await this.getTaskById(id, user)

        task.status = status

        await task.save()

        return task
    }

    async getTasks(
        { status, search }: FilterTasksDto,
        user: User
    ): Promise<Task[]> {
        const tasksQueryBuilder = this.taskRepository.createQueryBuilder('task')

        tasksQueryBuilder.where('task.user.id = :userId', { userId: user.id })

        if (status) {
            tasksQueryBuilder.andWhere('task.status = :status', {
                status,
                username: user.username,
            })
        }

        if (search) {
            tasksQueryBuilder.andWhere(
                'task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%` }
            )
        }

        return await tasksQueryBuilder.getMany()
    }

    async deleteTask(id: number, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user) //throw exception if task is not found

        task.remove()

        return task
    }
}
