import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    let port: string | number = process.env.PORT;

    if (port == null || port == '') {
        port = 3000;
    }

    await app.listen(port);
}

bootstrap();
