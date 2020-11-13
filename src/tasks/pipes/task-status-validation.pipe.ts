import {
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

import { TaskStatus } from '../task.types';

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        const uppercaseVal = value.toUpperCase();

        if (!this.isStatusValid(uppercaseVal)) {
            throw new BadRequestException('status is invalid');
        }

        return uppercaseVal;
    }

    private isStatusValid(status: string) {
        return Object.keys(TaskStatus).includes(status);
    }
}
