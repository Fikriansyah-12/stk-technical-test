import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class ReorderMenuDto {
   @ApiProperty({
      example: 'Systems',
      description: 'Nama menu yang akan di reorder',
    })
  @IsInt()
  @Min(0)
  newOrder: number;
}
