import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreDto } from './create-score.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScoreDto extends PartialType(CreateScoreDto) {
  @ApiProperty()
  value: number;
  @ApiProperty()
  perfect: number;
  @ApiProperty()
  great: number;
  @ApiProperty()
  good: number;
  @ApiProperty()
  bad: number;
  @ApiProperty()
  miss: number;
  @ApiProperty()
  max_combo: number;
  @ApiProperty()
  stage_pass: boolean;
  @ApiProperty()
  grade: string;
  @ApiProperty()
  plate: string;
  @ApiProperty()
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
