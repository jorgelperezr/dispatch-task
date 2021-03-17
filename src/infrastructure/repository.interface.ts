import { TaskEntity } from 'src/domain/entities/task.entity';
import { TaskDto } from './dto/task.dto';

export interface I_Repository {
  createTask(task: TaskEntity): Promise<TaskDto>;
  updateById(
    backstoreTaskId: string,
    UpdateTaskRequestDomain: TaskEntity,
  ): Promise<void>;
  findByNodeId(nodeId: string): Promise<TaskDto[]>;
  findById(backstoreTaskId: string): Promise<TaskDto>;
}
