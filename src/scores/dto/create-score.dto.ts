import { Player } from 'src/players/entities/player.entity';

export class CreateScoreDto {
  value: number;
  grade: string;
  plate: string;
  event_id: number;
  music_id: number;
  category_id: number;
}

export type CreateScoreParams = {
  value: number;
  grade: string;
  plate: string;
  event_id: number;
  music_id: number;
  category_id: number;
};
