import { ApiProperty } from "@nestjs/swagger";

export class CreatePhaseDto {
  @ApiProperty()
  phase_number: number;
  @ApiProperty()
  music_number: number;
  @ApiProperty()
  modes_available: string[];
  @ApiProperty()
  passing_players: number;
  @ApiProperty()
  category_id: number;
}

export type CreatePhaseParams = {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
  category_id: number;
};
