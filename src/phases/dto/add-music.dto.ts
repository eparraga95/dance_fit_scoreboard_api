import { ApiProperty } from '@nestjs/swagger';

export class AddMusicDto {
  @ApiProperty()
  music_id: number;
}

export type AddMusicParams = {
  music_id: number;
};
