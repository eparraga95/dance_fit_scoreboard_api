import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicDto } from './create-music.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMusicDto extends PartialType(CreateMusicDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  level: number;
  @ApiProperty()
  mode: string;
}

export type UpdateMusicParams = {
  name: string;
  level: number;
  mode: string;
};
