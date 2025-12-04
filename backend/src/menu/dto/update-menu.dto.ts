import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string | null;
}
