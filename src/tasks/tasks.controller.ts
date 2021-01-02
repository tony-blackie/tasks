import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Patch,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common'

import { TasksService } from './tasks.service'
import { TaskStatus } from './task.types'
import { CreateTaskDto } from './dto/create-task.dto'
import { FilterTasksDto } from './dto/filter-tasks.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskEntity as Task } from './task.entity'
import { User } from '../auth/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/get-user.decorator'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() filterDto: FilterTasksDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasks(
                {
                    ...filterDto,
                },
                user
            )
        }

        return this.tasksService.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number, @GetUser() user: User): Promise<Task> {
        return this.tasksService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user)
    }
}
