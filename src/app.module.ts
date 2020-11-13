import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG_LOCAL, DB_CONFIG_PROD } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

const dbConfig =
    process.env.NODE_ENV === 'development' ? DB_CONFIG_LOCAL : DB_CONFIG_PROD;

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), TasksModule, AuthModule],
})
export class AppModule {}
