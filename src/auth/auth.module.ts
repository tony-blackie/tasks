import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
        secret: 'verySecretKey',
        signOptions: {
            expiresIn: 3600
        }
    }), TypeOrmModule.forFeature([UserRepository])],
    exports: [JwtStrategy, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
