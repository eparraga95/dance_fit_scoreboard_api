import { Player } from "src/players/entities/player.entity";

export class CreateScoreDto {
  value: number;
  music: string;
  mode: string;
  level: number;
  grade: string;
  plate: string;
}

export type CreateScoreParams = {
    value: number;
    music: string;
    mode: string;
    level: number;
    grade: string;
    plate: string;
}
