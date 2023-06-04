import { Body, Controller, Get } from '@nestjs/common';
import { GPTService } from './gpt.service';
import { GPTRequestDto } from './dto/gpt-request.dto';

@Controller('gpt')
export class GPTController {
  constructor(private readonly gptService: GPTService) {}

  @Get()
  async getGPTResponse(@Body() gptRequestDto: GPTRequestDto): Promise<string> {
    return await this.gptService.getGPTResponse(gptRequestDto);
  }
}
