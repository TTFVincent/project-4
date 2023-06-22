import { Body, Controller, Get, Post } from '@nestjs/common';
import { GPTService } from './gpt.service';
import { GPTRequestDto } from './dto/gpt-request.dto';
import { GPTTripRequestDto } from './dto/gpt-trip-request.dto';
import { GPTRequest } from './entities/gptRequest';

@Controller()
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

  @Get('requests')
  async findAllRequests(): Promise<GPTRequest[]> {
    return await this.gptService.findAllRequests();
  }
}
