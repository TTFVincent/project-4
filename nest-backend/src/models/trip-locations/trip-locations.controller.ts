import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripLocationsService } from './trip-locations.service';
import { CreateTripLocationDto } from './dto/create-trip-location.dto';
import { UpdateTripLocationDto } from './dto/update-trip-location.dto';

@Controller('trip-locations')
export class TripLocationsController {
  constructor(private readonly tripLocationsService: TripLocationsService) {}

  @Post()
  create(@Body() createTripLocationDto: CreateTripLocationDto) {
    return this.tripLocationsService.create(createTripLocationDto);
  }

  @Get()
  findAll() {
    return this.tripLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripLocationDto: UpdateTripLocationDto) {
    return this.tripLocationsService.update(+id, updateTripLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripLocationsService.remove(+id);
  }
}
