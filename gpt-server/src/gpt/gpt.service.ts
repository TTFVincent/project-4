import { HttpException, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { GPTRequestDto } from './dto/gpt-request.dto';
import { GPTTripRequestDto } from './dto/gpt-trip-request.dto';

@Injectable()
export class GPTService {
  private configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private openai = new OpenAIApi(this.configuration);

  async getGPTResponse(gptRequestDto: GPTRequestDto): Promise<string> {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: gptRequestDto.input }],
        temperature: 0.5,
        max_tokens: 2047,
      });
      if (!response.data.choices[0].message?.content) return 'error';
      return response.data.choices[0].message.content;
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else {
        throw new HttpException('An error occurred during your request.', 500);
      }
    }
  }

  async getGPTTripResponse(
    gptTripRequestDto: GPTTripRequestDto,
  ): Promise<string> {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a personalized travel itinerary for a trip to ${gptTripRequestDto.destination} with a budget of ${gptTripRequestDto.budget}. The traveler is interested in a ${gptTripRequestDto.travelStyle} vacation and enjoys ${gptTripRequestDto.interestsNew}. The itinerary should include ${gptTripRequestDto.activityType} activities and ${gptTripRequestDto.cuisineType} dining options. Please provide a detailed itinerary with daily recommendations from ${gptTripRequestDto.from_time} to ${gptTripRequestDto.to_time}, including suggested destinations, activities, and dining options. The itinerary should be in this JSON format: [{\"location\":,\"from_time\":,\"to_time\":,\"budget\":},]. The JSON object:`,
          },
        ],
        temperature: 0.5,
        max_tokens: 2047,
      });
      if (!response.data.choices[0].message?.content) return 'error';
      return response.data.choices[0].message.content;
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
