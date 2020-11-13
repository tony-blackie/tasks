import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const DB_CONFIG_LOCAL: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "tasks",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
};

export const DB_CONFIG_PROD: TypeOrmModuleOptions = {
  type: "postgres",
  host: "ec2-34-225-162-157.compute-1.amazonaws.com",
  port: 5432,
  username: "shntukujjivkdw",
  password: "a018ea7adb4ae63b2e8ebda075668e1f6baba104ea5af7936941468c3ba662ee",
  database: "d8mv1fgbfrktuq",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
  ssl: true,
};
