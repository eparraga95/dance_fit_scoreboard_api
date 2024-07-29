import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword: string;
  @ApiProperty()
  bar: boolean;
}

export type CreatePlayerParams = {
  nickname: string;
  password: string;
  confirmPassword: string;
  bar: boolean
};
