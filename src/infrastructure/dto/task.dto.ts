import { PackageState } from 'src/domain/enums/package.state.enum';
import { TaskState } from 'src/domain/enums/task.state.enum';

export class TaskDto {
  _id: string;
  backstoreTaskId: string;
  operationCode: string;
  commerce: string;
  nodeId: string;
  nodeName: string;
  logisticsOperator: string;
  statusTask: TaskState;
  nodeDestination: string;
  dispatchedDate: Date;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  shipmentAddress: string;
  packages: {
    _id: string;
    lpnId: string;
    packageId?: string;
    status: PackageState;
  }[];
}
