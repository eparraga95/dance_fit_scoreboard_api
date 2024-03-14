import { ApiProperty } from "@nestjs/swagger";

export class AdminCreateScoreDto {
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
  event_id: number;
  @ApiProperty()
  music_id: number;
  @ApiProperty()
  category_id: number;
  @ApiProperty()
  phase_id: number;
  @ApiProperty()
  player_id: number;
}

export type AdminCreateScoreParams = {
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
  event_id: number;
  music_id: number;
  category_id: number;
  phase_id: number;
  player_id: number;
}
