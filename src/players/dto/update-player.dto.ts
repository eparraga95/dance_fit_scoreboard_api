import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  bar: boolean
}

export type UpdatePlayerParams = {
  nickname: string;
  password: string;
  role: string;
  bar: boolean;
};
