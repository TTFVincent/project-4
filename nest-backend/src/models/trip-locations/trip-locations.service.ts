import { Injectable } from '@nestjs/common';
import { CreateTripLocationDto } from './dto/create-trip-location.dto';
import { UpdateTripLocationDto } from './dto/update-trip-location.dto';

@Injectable()
export class TripLocationsService {
  create(createTripLocationDto: CreateTripLocationDto) {
    return 'This action adds a new tripLocation';
  }

  findAll() {
    return `This action returns all tripLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tripLocation`;
  }

  update(id: number, updateTripLocationDto: UpdateTripLocationDto) {
    return `This action updates a #${id} tripLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} tripLocation`;
  }
}
