import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Inject,
} from '@nestjs/common';
import { I_Domain } from 'src/domain/domain.interface';
import { TaskRequestDomain } from 'src/domain/value_objects/task.create.req.domain';
import { UpdateTaskRequestDomain } from 'src/domain/value_objects/task.update.req.domain';

@Controller('/task/dispatch')
export class ApplicationController {
  constructor(@Inject('I_Domain') private taskService: I_Domain) {}

  @Post()
  async createTask(@Body() task: TaskRequestDomain) {
    try {
      return await this.taskService.createTask(task);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch(':backstoreTaskId')
  async updateTask(
    @Param('backstoreTaskId') backstoreTaskId: string,
    @Body() updateTaskRequestDomain: UpdateTaskRequestDomain,
  ) {
    try {
      return await this.taskService.updateTask(
        backstoreTaskId,
        updateTaskRequestDomain,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('/by-node')
  async findByNodeId(@Query('nodeId') nodeId: string) {
    try {
      try {
        return await this.taskService.findByNodeId(nodeId);
      } catch (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':backstoreTaskId')
  async findById(@Param('backstoreTaskId') backstoreTaskId: string) {
    try {
      return await this.taskService.findById(backstoreTaskId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
