import { Body, Controller, Post } from '@nestjs/common';
import { GPTService } from './gpt.service';
import { GPTRequestDto } from './dto/gpt-request.dto';
import { GPTTripRequestDto } from './dto/gpt-trip-request.dto';

@Controller('gpt')
export class GPTController {
  constructor(private readonly gptService: GPTService) {}

  @Post()
  async getGPTResponse(@Body() gptRequestDto: GPTRequestDto): Promise<string> {
    return await this.gptService.getGPTResponse(gptRequestDto);
  }

  @Post('trip')
  async getGPTTripResponse(
    @Body() gptTripRequestDto: GPTTripRequestDto,
  ): Promise<string> {
    return await this.gptService.getGPTTripResponse(gptTripRequestDto);
  }
}
