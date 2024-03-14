import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword: string;
}

export type CreatePlayerParams = {
  nickname: string;
  password: string;
  confirmPassword: string;
}
