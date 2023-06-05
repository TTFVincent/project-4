import { Body, Controller, Get } from '@nestjs/common';
import { GPTService } from './gpt.service';
import { GPTRequestDto } from './dto/gpt-request.dto';
import { GPTTripRequestDto } from './dto/gpt-trip-request.dto';

@Controller('gpt')
export class GPTController {
  constructor(private readonly gptService: GPTService) {}

  @Get()
  async getGPTResponse(@Body() gptRequestDto: GPTRequestDto): Promise<string> {
    return await this.gptService.getGPTResponse(gptRequestDto);
  }

  @Get('trip')
  async getGPTTripResponse(
    @Body() gptTripRequestDto: GPTTripRequestDto,
  ): Promise<string> {
    return await this.gptService.getGPTTripResponse(gptTripRequestDto);
  }
}
