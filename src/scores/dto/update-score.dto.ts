import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreDto } from './create-score.dto';

export class UpdateScoreDto extends PartialType(CreateScoreDto) {
  value: number;
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  max_combo: number;
  stage_pass: boolean;
  grade: string;
  plate: string;
  validated: boolean;
}

export type UpdateScoreParams = {
  value: number;
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  max_combo: number;
  stage_pass: boolean;
  grade: string;
  plate: string;
  validated: boolean;
};
