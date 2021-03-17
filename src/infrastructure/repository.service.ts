import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entityToDto, entityToDtoArray } from 'src/domain/transforms';
import { PackageEntity } from 'src/domain/entities/package.entity';
import { TaskEntity } from 'src/domain/entities/task.entity';
import { Repository } from 'typeorm';
import { I_Repository } from './repository.interface';

@Injectable()
export class RepositoryService implements I_Repository {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(PackageEntity)
    private packageRepository: Repository<PackageEntity>,
  ) {}

  async createTask(task: TaskEntity) {
    try {
      return entityToDto(await this.taskRepository.save(task));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateById(backstoreTaskId: string, taskDb: TaskEntity): Promise<void> {
    try {
      const {
        nodeId,
        nodeDestination,
        dispatchedDate,
        updatedAt,
        packages,
      } = taskDb;

      await this.taskRepository
        .createQueryBuilder()
        .update('task')
        .set({
          nodeId,
          nodeDestination,
          dispatchedDate,
          updatedAt,
        })
        .where('backstoreTaskId = :backstoreTaskId', {
          backstoreTaskId,
        })
        .execute();

      for (const pack of packages) {
        const { lpnId, packageId, status } = pack;
        await this.packageRepository
          .createQueryBuilder()
          .update('package')
          .set({ lpnId, status })
          .where('packageId = :packageId', {
            packageId,
          })
          .execute();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(backstoreTaskId: string) {
    try {
      const task = await this.taskRepository.findOne({ backstoreTaskId });
      if (typeof task === 'undefined') {
        throw new NotFoundException('Not Found');
      }

      return entityToDto(task);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByNodeId(nodeId: string) {
    try {
      const tasks = await this.taskRepository.find({ nodeId });
      return entityToDtoArray(tasks);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
