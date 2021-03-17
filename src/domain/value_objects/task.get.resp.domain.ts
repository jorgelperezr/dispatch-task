import { PackageRequestDomain } from 'src/domain/value_objects/package.create.req.domain';
import { TaskState } from '../enums/task.state.enum';

export class ResponseGetTaskDomain {
  backstoreTaskId: string;
  nodeId: string;
  statusTask: TaskState;
  dueDate: Date;
  logisticsOperator: string;
  nodeDestination: string;
  dispatchedDate: Date;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  packages: PackageRequestDomain[];
}
