export class CreateComfortLevelDto {
    level_single: number
    level_double: number
    player_id: number
    event_id: number
}

export type CreateComfortLevelParams = {
    level_single: number
    level_double: number
    player_id: number
    event_id: number
}
