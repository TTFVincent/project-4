import { Module } from '@nestjs/common';
import { GPTController } from './gpt.controller';
import { GPTService } from './gpt.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GPTRequest } from './entities/gptRequest';

@Module({
  imports: [SequelizeModule.forFeature([GPTRequest])],
  controllers: [GPTController],
  providers: [GPTService],
})
export class GPTModule {}
