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

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  password: string;

  @Column({ unique: true })
  email: string;

  @Column
  phone: string;

  @Column
  role: string;

  @HasMany(() => Trip)
  Trips: Trip[];
}
