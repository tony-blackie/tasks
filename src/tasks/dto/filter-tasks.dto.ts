import { TaskStatus } from '../task.types';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class FilterTasksDto {
    @IsOptional()
    @IsNotEmpty()
    search?: string;

    @IsOptional()
    @IsIn(Object.keys(TaskStatus))
    status?: TaskStatus;
}
