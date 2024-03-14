import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  level_min: number;
  @ApiProperty()
  level_max: number;
  @ApiProperty()
  event_id: number;
  @ApiProperty()
  number_of_phases: number;
}

export type CreateCategoryParams = {
  name: string;
  level_min: number;
  level_max: number;
  event_id: number;
  number_of_phases: number;
};
