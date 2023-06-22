import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GPTModule } from './gpt/gpt.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GPTRequest } from './gpt/entities/gptRequest';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [GPTRequest],
      synchronize: false,
    }),
    GPTModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
