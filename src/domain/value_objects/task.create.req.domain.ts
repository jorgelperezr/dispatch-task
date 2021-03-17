import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PackageRequestDomain } from 'src/domain/value_objects/package.create.req.domain';
import { TaskState } from '../enums/task.state.enum';

export class TaskRequestDomain {
  @IsString()
  operationCode: string;
  @IsString()
  commerce: string;
  @IsString()
  nodeId: string;
  @IsString()
  nodeName: string;
  @IsString()
  logisticsOperator: string;
  @IsEnum(TaskState)
  statusTask: TaskState;
  @IsUUID('all')
  @IsOptional()
  nodeDestination?: string;
  @IsDateString()
  dispatchedDate: Date;
  @IsString()
  @IsOptional()
  shipmentAddress?: string;
  @IsDateString()
  @IsOptional()
  expiredAt?: Date;
  @IsDateString()
  @IsOptional()
  dueDate?: Date;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageRequestDomain)
  packages: PackageRequestDomain[];
}
