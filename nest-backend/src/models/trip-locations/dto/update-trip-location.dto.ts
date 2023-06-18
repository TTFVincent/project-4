import { PartialType } from '@nestjs/mapped-types';
import { CreateTripLocationDto } from './create-trip-location.dto';

export class UpdateTripLocationDto extends PartialType(CreateTripLocationDto) {}
