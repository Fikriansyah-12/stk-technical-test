import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiPropertyOptional({ example: 'System Management' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: null,
    nullable: true,
    description: 'Parent id baru. Null untuk jadikan root',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string | null;
}
