import { createParamDecorator } from '@nestjs/common';
import { request } from 'http';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, req) => {
    const request = req.switchToHttp().getRequest();

    return request?.user;
});