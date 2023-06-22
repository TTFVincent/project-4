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
import { Trip } from 'src/models/trips/entities/trip.entity';
import { Location } from 'src/models/locations/entities/location.entity';

@Table({ tableName: 'trip_locations' })
export class TripLocation extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Trip)
  @Column
  trip_id: number;

  @ForeignKey(() => Location)
  @Column
  location_id: number;
}
