import { ApiProperty } from "@nestjs/swagger";

export class RemoveMusicDto {
  @ApiProperty()
  music_id: number;
}

export type RemoveMusicParams = {
  music_id: number;
};
