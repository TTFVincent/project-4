import { HttpException, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { GPTRequestDto } from './dto/gpt-request.dto';

@Injectable()
export class GPTService {
  private configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private openai = new OpenAIApi(this.configuration);

  async getGPTResponse(gptRequestDto: GPTRequestDto): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: gptRequestDto.input,
        temperature: 0,
        max_tokens: 2047,
      });
      if (!response.data.choices[0].text) return 'error';
      return response.data.choices[0].text;
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else {
        throw new HttpException('An error occurred during your request.', 500);
      }
    }
  }
}
