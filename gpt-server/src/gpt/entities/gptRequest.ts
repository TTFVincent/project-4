import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'gpt_requests' })
export class GPTRequest extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  group_size: string;
  @Column({ allowNull: false })
  destination: string;
  @Column({ allowNull: false })
  budget: string;
  @Column({ allowNull: false })
  travel_style: string;
  @Column({ allowNull: false })
  activity_type: string;
  @Column({ allowNull: false })
  cuisine_type: string;
  @Column({ allowNull: false })
  start_time: string;
  @Column({ allowNull: false })
  end_time: string;
  @Column({ allowNull: false })
  interests_new: string;

  @Column
  output: string;
}
