export class CreateCategoryDto {
  name: string;
  level_min: number;
  level_max: number;
  event_id: number;
  number_of_phases: number;
}

export type CreateCategoryParams = {
  name: string;
  level_min: number;
  level_max: number;
  event_id: number;
  number_of_phases: number;
};
