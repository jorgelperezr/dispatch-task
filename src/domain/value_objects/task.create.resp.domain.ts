import { IsOptional } from 'class-validator';

export class TaskCreatedResponseDomain {
  backstoreTaskId: string;
  @IsOptional()
  expiredAt?: Date;
  createdAt: Date;
  @IsOptional()
  updatedAt?: Date;
}
