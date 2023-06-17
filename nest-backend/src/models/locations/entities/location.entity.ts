import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { TripLocation } from 'src/models/trip-locations/entities/trip-location.entity';
import { Trip } from 'src/models/trips/entities/trip.entity';

Table({ tableName: 'locations' });
export class Location extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  detail_location: string;

  @Column
  latitude: string;

  @Column
  longitude: string;

  @Column
  obsolete: boolean;

  @BelongsToMany(() => Trip, () => TripLocation)
  Trips: Trip[];
}
