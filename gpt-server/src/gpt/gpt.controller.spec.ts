import { Test, TestingModule } from '@nestjs/testing';
import { GPTController } from './gpt.controller';

describe('GptController', () => {
  let controller: GPTController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GPTController],
    }).compile();

    controller = module.get<GPTController>(GPTController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
