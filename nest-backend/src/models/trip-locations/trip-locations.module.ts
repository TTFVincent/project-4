import { Module } from '@nestjs/common';
import { TripLocationsService } from './trip-locations.service';
import { TripLocationsController } from './trip-locations.controller';

@Module({
  controllers: [TripLocationsController],
  providers: [TripLocationsService]
})
export class TripLocationsModule {}
