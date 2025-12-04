import { IsInt, Min } from 'class-validator';

export class ReorderMenuDto {
  @IsInt()
  @Min(0)
  newOrder: number;
}
