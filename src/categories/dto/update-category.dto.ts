import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
}

export type UpdateCategoryParams = {
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
};
