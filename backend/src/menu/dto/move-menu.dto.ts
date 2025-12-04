import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class MoveMenuDto {
  @ApiProperty({
    example: 'Systems',
    description: 'Menu yang akan di move',
  })
  @IsOptional()
  @IsUUID()
  newParentId?: string | null;
}
