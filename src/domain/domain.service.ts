import { Inject, Injectable } from '@nestjs/common';
import { I_Repository } from 'src/infrastructure/repository.interface';
import { ResponseGetTaskDomain } from 'src/domain/value_objects/task.get.resp.domain';
import { UpdateTaskResponseDomain } from 'src/domain/value_objects/task.update.resp.domain';
import {
  createdToRespCreatedDto,
  getToRespGetDto,
  getToRespGetDtoArray,
  taskReqDtoToEntity,
  taskReqUpdDtoToEntity,
} from './transforms';
import { TaskRequestDomain } from './value_objects/task.create.req.domain';
import { TaskCreatedResponseDomain } from './value_objects/task.create.resp.domain';
import { UpdateTaskRequestDomain } from './value_objects/task.update.req.domain';
import { I_Domain } from './domain.interface';

@Injectable()
export class DomainService implements I_Domain {
  constructor(@Inject('I_Repository') private taskRepository: I_Repository) {}

  async createTask(
    task: TaskRequestDomain,
  ): Promise<TaskCreatedResponseDomain> {
    const taskDto = await this.taskRepository.createTask(
      taskReqDtoToEntity(task),
    );
    return createdToRespCreatedDto(taskDto);
  }
  async updateTask(
    backstoreTaskId: string,
    updateTaskRequestDomain: UpdateTaskRequestDomain,
  ): Promise<UpdateTaskResponseDomain> {
    try {
      const taskInDb = await this.taskRepository.findById(backstoreTaskId);

      await this.taskRepository.updateById(
        backstoreTaskId,
        taskReqUpdDtoToEntity(updateTaskRequestDomain, taskInDb),
      );

      const taskUpd = await this.taskRepository.findById(backstoreTaskId);

      return getToRespGetDto(taskUpd);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findByNodeId(nodeId: string): Promise<ResponseGetTaskDomain[]> {
    try {
      const tasksDto = await this.taskRepository.findByNodeId(nodeId);
      return getToRespGetDtoArray(tasksDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findById(backstoreTaskId: string): Promise<ResponseGetTaskDomain> {
    try {
      const taskDto = await this.taskRepository.findById(backstoreTaskId);
      return getToRespGetDto(taskDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
