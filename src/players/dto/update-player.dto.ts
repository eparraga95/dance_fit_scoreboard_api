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
}

export type UpdatePlayerParams = {
  nickname: string;
  password: string;
  role: string;
};
