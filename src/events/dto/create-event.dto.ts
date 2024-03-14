import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: boolean;
}

export type CreateEventParams = {
  name: string;
  status: boolean;
};
