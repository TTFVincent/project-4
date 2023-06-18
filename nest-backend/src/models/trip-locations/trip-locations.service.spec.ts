import { Test, TestingModule } from '@nestjs/testing';
import { TripLocationsService } from './trip-locations.service';

describe('TripLocationsService', () => {
  let service: TripLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripLocationsService],
    }).compile();

    service = module.get<TripLocationsService>(TripLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
