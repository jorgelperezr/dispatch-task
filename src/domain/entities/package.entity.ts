import { TaskEntity } from 'src/domain/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageState } from '../enums/package.state.enum';

@Entity({ name: 'package' })
export class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  lpnId: string;
  @Column({ nullable: true })
  packageId: string;
  @Column()
  status: PackageState;
  @ManyToOne(() => TaskEntity, (task) => task.packages)
  @JoinColumn()
  task: TaskEntity;
}
