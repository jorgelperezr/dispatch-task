import { TaskRequestDomain } from 'src/domain/value_objects/task.create.req.domain';
import { TaskCreatedResponseDomain } from 'src/domain/value_objects/task.create.resp.domain';
import { ResponseGetTaskDomain } from 'src/domain/value_objects/task.get.resp.domain';
import { UpdateTaskRequestDomain } from 'src/domain/value_objects/task.update.req.domain';
import { UpdateTaskResponseDomain } from './value_objects/task.update.resp.domain';

export interface I_Domain {
  createTask(task: TaskRequestDomain): Promise<TaskCreatedResponseDomain>;
  updateTask(
    backstoreTaskId: string,
    UpdateTaskRequestDomain: UpdateTaskRequestDomain,
  ): Promise<UpdateTaskResponseDomain>;
  findByNodeId(nodeId: string): Promise<ResponseGetTaskDomain[]>;
  findById(backstoreTaskId: string): Promise<ResponseGetTaskDomain>;
}
