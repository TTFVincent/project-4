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
import { Location } from 'src/models/locations/entities/location.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({ tableName: 'trips' })
export class Trip extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Location, () => TripLocation)
  Locations: Location[];
}
