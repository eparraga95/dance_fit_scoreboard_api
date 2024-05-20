import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  event_type_id: number
}

export type CreateEventParams = {
  name: string;
  status: boolean;
  event_type_id: number
};
