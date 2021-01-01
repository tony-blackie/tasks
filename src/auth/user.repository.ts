import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }

            throw new InternalServerErrorException();
        }
    }

    async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt)
    };

    async validateUserPassword({ username, password }: AuthCredentialsDto): Promise<string> {
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }

        return null;
    }
}
