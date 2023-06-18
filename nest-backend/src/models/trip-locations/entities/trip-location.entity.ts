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

Table({ tableName: 'trip_locations' });
export class TripLocation extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
}
