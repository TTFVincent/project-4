import { Test, TestingModule } from '@nestjs/testing';
import { TripLocationsController } from './trip-locations.controller';
import { TripLocationsService } from './trip-locations.service';

describe('TripLocationsController', () => {
  let controller: TripLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripLocationsController],
      providers: [TripLocationsService],
    }).compile();

    controller = module.get<TripLocationsController>(TripLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
