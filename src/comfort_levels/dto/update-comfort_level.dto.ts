import { PartialType } from '@nestjs/swagger';
import { CreateComfortLevelDto } from './create-comfort_level.dto';

export class UpdateComfortLevelDto extends PartialType(CreateComfortLevelDto) {
    level_single: number
    level_double: number
}

export type UpdateComfortLevelParams = {
    level_single: number
    level_double: number
}