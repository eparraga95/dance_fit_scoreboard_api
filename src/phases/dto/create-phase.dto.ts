export class CreatePhaseDto {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
  category_id: number;
}

export type CreatePhaseParams = {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
  category_id: number;
};
