import { ApiProperty } from "@nestjs/swagger";

export class UpdatePhaseDto {
  @ApiProperty()
  phase_number: number;
  @ApiProperty()
  music_number: number;
  @ApiProperty()
  modes_available: string[];
  @ApiProperty()
  passing_players: number;
}

export type UpdatePhaseParams = {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
};
