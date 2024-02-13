export class CreateCategoryDto {
  name: string;
  level_min: number;
  level_max: number;
  event_id: number;
  music_ids?: number[];
}

export type CreateCategoryParams = {
  name: string;
  level_min: number;
  level_max: number;
  event_id: number;
  music_ids?: number[];
};
