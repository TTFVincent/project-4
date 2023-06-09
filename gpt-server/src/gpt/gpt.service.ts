import { HttpException, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { GPTRequestDto } from './dto/gpt-request.dto';
import { GPTTripRequestDto } from './dto/gpt-trip-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { GPTRequest } from './entities/gptRequest';

@Injectable()
export class GPTService {
  constructor(
    @InjectModel(GPTRequest)
    private gptRequestModel: typeof GPTRequest,
  ) {}

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
      const output = response.data.choices[0].message?.content;
      if (!output) return 'error';
      return output;
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
            // content: `Generate a personalized travel itinerary for a trip to ${gptTripRequestDto.destination} with a budget of HKD ${gptTripRequestDto.budget}. The traveler is interested in a ${gptTripRequestDto.travel_style} vacation and enjoys ${gptTripRequestDto.interests_new}. The itinerary should include ${gptTripRequestDto.activity_type} activities and ${gptTripRequestDto.cuisine_type} dining options. Please provide a detailed itinerary with daily recommendations from ${gptTripRequestDto.start_time} to ${gptTripRequestDto.end_time}, including suggested destinations, activities, and dining options. The resulting JSON object should be in this format without other text: [{\"location\":,\"location_address\":,\"latitude\":,\"longitude\":,\"from_time\":,\"to_time\":,\"budget\":},]. The JSON object:`,
            content: `Generate a personalized travel itinerary for a trip in the location of ${gptTripRequestDto.destination} with a budget of HKD ${gptTripRequestDto.budget}.
            The activities choices  ${gptTripRequestDto.travel_style} and the trip activities should focus more on ${gptTripRequestDto.interests_new} if possible.
            Please provide a detailed itinerary with daily recommendations from ${gptTripRequestDto.start_time} to ${gptTripRequestDto.end_time},
            if ${gptTripRequestDto.start_time} before 12:00pm suggest a restaurant with ${gptTripRequestDto.cuisine_type} near by the last activity location,
            and if ${gptTripRequestDto.end_time} before 07:00pm suggest a restaurant with ${gptTripRequestDto.cuisine_type} for dinner near by the last activity location.
            the suggested activities must not over lap with other activities, also spare some time for traveling to the next location according to th distance.
            The resulting JSON object must be in this format only and must not have other string:
            [{\"location\":,\"location_address\":,\"latitude\":,\"longitude\":,\"from_time\":,\"to_time\":,\"budget\":},]. The JSON object:`,
          },
        ],
        temperature: 0.8,
        max_tokens: 2047,
      });
      const output = response.data.choices[0].message?.content;
      if (!response.data.choices[0].message?.content) return 'error';
      this.gptRequestModel.create({ ...gptTripRequestDto, output });
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

  findAllRequests(): Promise<GPTRequest[]> {
    return this.gptRequestModel.findAll();
  }
}
