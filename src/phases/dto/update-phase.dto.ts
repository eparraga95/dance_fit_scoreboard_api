export class UpdatePhaseDto {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
}

export type UpdatePhaseParams = {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
};
