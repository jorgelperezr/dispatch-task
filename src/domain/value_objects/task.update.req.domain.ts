import { PartialType } from '@nestjs/swagger';
import { TaskRequestDomain } from './task.create.req.domain';

export class UpdateTaskRequestDomain extends PartialType(TaskRequestDomain) {}
