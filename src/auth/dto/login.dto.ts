import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
}

export type LoginParams = {
  nickname: string;
  password: string;
};
