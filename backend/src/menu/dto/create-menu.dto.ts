import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    example: 'Systems',
    description: 'Nama menu yang akan ditambahkan',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: null,
    nullable: true,
    description: 'Parent menu id. Null atau kosong untuk root menu',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
