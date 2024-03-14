import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  level_min: number;
  @ApiProperty()
  level_max: number;
  @ApiProperty()
  number_of_phases: number;
}

export type UpdateCategoryParams = {
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
};
