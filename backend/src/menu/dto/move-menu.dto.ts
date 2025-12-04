import { IsOptional, IsUUID } from 'class-validator';

export class MoveMenuDto {
  @IsOptional()
  @IsUUID()
  newParentId?: string | null;
}
