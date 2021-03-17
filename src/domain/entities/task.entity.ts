import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskState } from '../enums/task.state.enum';
import { PackageEntity } from 'src/domain/entities/package.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;
  @Column()
  @Generated('uuid')
  backstoreTaskId: string;
  @Column()
  operationCode: string;
  @Column()
  commerce: string;
  @Column()
  nodeId: string;
  @Column()
  nodeName: string;
  @Column()
  logisticsOperator: string;
  @Column()
  statusTask: TaskState;
  @Column({ nullable: true })
  nodeDestination: string;
  @Column()
  dispatchedDate: Date;
  @Column({ nullable: true })
  expiredAt: Date;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
  @Column({ nullable: true })
  dueDate: Date;
  @Column({ nullable: true })
  shipmentAddress: string;
  @OneToMany(() => PackageEntity, (pack) => pack.task, {
    cascade: true,
    eager: true,
  })
  packages: PackageEntity[];
}
