import { Player } from 'src/players/entities/player.entity';

export class CreateScoreDto {
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
  phase_id: number
}

export type CreateScoreParams = {
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
};
