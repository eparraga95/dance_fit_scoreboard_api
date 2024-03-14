import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  level: number;
  @ApiProperty()
  mode: string;
}

export type CreateMusicParams = {
  name: string;
  level: number;
  mode: string;
};
