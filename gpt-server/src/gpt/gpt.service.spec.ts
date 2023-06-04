import { Test, TestingModule } from '@nestjs/testing';
import { GPTService } from './gpt.service';

describe('GptService', () => {
  let service: GPTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GPTService],
    }).compile();

    service = module.get<GPTService>(GPTService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
