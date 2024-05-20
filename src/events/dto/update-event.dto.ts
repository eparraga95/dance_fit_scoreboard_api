import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: boolean;
}

export type UpdateEventParams = {
  name: string;
  status: boolean;
};
