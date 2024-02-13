import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreDto } from './create-score.dto';

export class UpdateScoreDto extends PartialType(CreateScoreDto) {
  value: number;
  grade: string;
  plate: string;
  validated: boolean;
}

export type UpdateScoreParams = {
  value: number;
  grade: string;
  plate: string;
  validated: boolean;
};
