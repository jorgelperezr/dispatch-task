import { TaskDto } from 'src/infrastructure/dto/task.dto';
import { PackageEntity } from 'src/domain/entities/package.entity';
import { TaskRequestDomain } from 'src/domain/value_objects/task.create.req.domain';
import { TaskCreatedResponseDomain } from 'src/domain/value_objects/task.create.resp.domain';
import { UpdateTaskRequestDomain } from 'src/domain/value_objects/task.update.req.domain';
import { TaskEntity } from 'src/domain/entities/task.entity';
import { ResponseGetTaskDomain } from './value_objects/task.get.resp.domain';
import { PackageRequestDomain } from './value_objects/package.create.req.domain';

const taskReqDtoToEntity = (
  TaskRequestDomain?: TaskRequestDomain,
): TaskEntity => {
  const newTask = new TaskEntity();
  newTask.operationCode = TaskRequestDomain.operationCode;
  newTask.commerce = TaskRequestDomain.commerce;
  newTask.nodeId = TaskRequestDomain.nodeId;
  newTask.nodeName = TaskRequestDomain.nodeName;
  newTask.logisticsOperator = TaskRequestDomain.logisticsOperator;
  newTask.statusTask = TaskRequestDomain.statusTask;
  newTask.nodeDestination = TaskRequestDomain.nodeDestination;
  newTask.dispatchedDate = TaskRequestDomain.dispatchedDate;
  newTask.shipmentAddress = TaskRequestDomain.shipmentAddress;
  newTask.createdAt = new Date();
  newTask.packages = [];
  for (const pack of TaskRequestDomain.packages) {
    const newPack = new PackageEntity();
    newPack.lpnId = pack.lpnId;
    newPack.packageId = pack.packageId;
    newPack.status = pack.status;

    newTask.packages.push(newPack);
  }
  return newTask;
};

const entityToDto = (task: TaskEntity): TaskDto => {
  const dto = new TaskDto();
  dto._id = task._id;
  dto.backstoreTaskId = task.backstoreTaskId;
  dto.operationCode = task.operationCode;
  dto.commerce = task.commerce;
  dto.nodeId = task.nodeId;
  dto.nodeName = task.nodeName;
  dto.logisticsOperator = task.logisticsOperator;
  dto.statusTask = task.statusTask;
  dto.nodeDestination = task.nodeDestination;
  dto.dispatchedDate = task.dispatchedDate;
  dto.expiredAt = task.expiredAt;
  dto.createdAt = task.createdAt;
  dto.updatedAt = task.updatedAt;
  dto.packages = [];
  for (const pack of task.packages) {
    dto.packages.push({
      _id: pack._id,
      lpnId: pack.lpnId,
      packageId: pack.packageId,
      status: pack.status,
    });
  }

  return dto;
};

const dtoToEntity = (task: TaskDto): TaskEntity => {
  const entity = new TaskEntity();
  entity._id = task._id;
  entity.backstoreTaskId = task.backstoreTaskId;
  entity.operationCode = task.operationCode;
  entity.commerce = task.commerce;
  entity.nodeId = task.nodeId;
  entity.nodeName = task.nodeName;
  entity.logisticsOperator = task.logisticsOperator;
  entity.statusTask = task.statusTask;
  entity.nodeDestination = task.nodeDestination;
  entity.dispatchedDate = task.dispatchedDate;
  entity.expiredAt = task.expiredAt;
  entity.createdAt = task.createdAt;
  entity.updatedAt = task.updatedAt;
  entity.packages = [];
  for (const pack of task.packages) {
    const newPack = new PackageEntity();
    newPack._id = pack._id;
    newPack.lpnId = pack.lpnId;
    newPack.packageId = pack.packageId;
    newPack.status = pack.status;

    entity.packages.push(newPack);
  }

  return entity;
};

const createdToRespCreatedDto = (task: TaskDto): TaskCreatedResponseDomain => {
  const respTask = new TaskCreatedResponseDomain();
  respTask.backstoreTaskId = task.backstoreTaskId;
  respTask.expiredAt = task.expiredAt;
  respTask.createdAt = task.createdAt;
  respTask.updatedAt = task.updatedAt;

  return respTask;
};

const taskReqUpdDtoToEntity = (
  taskUpd: UpdateTaskRequestDomain,
  taskDb: TaskDto,
): TaskEntity => {
  taskDb.nodeId = taskUpd.nodeId;
  taskDb.nodeDestination = taskUpd.nodeDestination;
  taskDb.dispatchedDate = taskUpd.dispatchedDate;
  taskDb.updatedAt = new Date();
  taskDb.dueDate = taskUpd.dueDate;
  taskDb.expiredAt = taskUpd.expiredAt;
  for (const pack of taskDb.packages) {
    const regPack = taskUpd.packages.find(
      (pk) => pk.packageId === pack.packageId,
    );
    if (regPack) {
      pack.status = regPack.status;
      pack.lpnId = regPack.lpnId;
    }
  }
  return dtoToEntity(taskDb);
};

const getToRespGetDto = (task: TaskDto): ResponseGetTaskDomain => {
  const respTask = new ResponseGetTaskDomain();
  respTask.backstoreTaskId = task.backstoreTaskId;
  respTask.nodeId = task.nodeId;
  respTask.statusTask = task.statusTask;
  respTask.logisticsOperator = task.logisticsOperator;
  respTask.nodeDestination = task.nodeDestination;
  respTask.dispatchedDate = task.dispatchedDate;
  respTask.expiredAt = task.expiredAt;
  respTask.createdAt = task.createdAt;
  respTask.updatedAt = task.updatedAt;
  respTask.dueDate = task.dueDate;
  respTask.packages = [];
  for (const pack of task.packages) {
    const respPackage = new PackageRequestDomain();
    respPackage.lpnId = pack.lpnId;
    respPackage.packageId = pack.packageId;
    respPackage.status = pack.status;

    respTask.packages.push(respPackage);
  }
  return respTask;
};

const getToRespGetDtoArray = (dto: TaskDto[]): ResponseGetTaskDomain[] => {
  const domain: ResponseGetTaskDomain[] = [];

  for (const task of dto) {
    domain.push(getToRespGetDto(task));
  }

  return domain;
};

const entityToDtoArray = (dtos: TaskEntity[]): TaskDto[] => {
  const domain: TaskDto[] = [];

  for (const task of dtos) {
    domain.push(entityToDto(task));
  }

  return domain;
};

export {
  taskReqDtoToEntity,
  entityToDto,
  createdToRespCreatedDto,
  taskReqUpdDtoToEntity,
  getToRespGetDto,
  getToRespGetDtoArray,
  entityToDtoArray,
};
