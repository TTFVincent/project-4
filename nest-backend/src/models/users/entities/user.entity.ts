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
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column
  password: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column
  phone: string;

  @Column({ allowNull: false, defaultValue: 'user' })
  role: string;

  @HasMany(() => Trip)
  Trips: Trip[];
}
