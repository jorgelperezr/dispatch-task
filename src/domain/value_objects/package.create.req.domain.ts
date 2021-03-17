import { IsOptional } from 'class-validator';
import { PackageState } from '../enums/package.state.enum';

export class PackageRequestDomain {
  lpnId: string;
  @IsOptional()
  packageId?: string;
  status: PackageState;
}
