import { ApiProperty } from "@nestjs/swagger"

export class AdminRemovePlayerDto {
    @ApiProperty()
    player_id: number
}

export type AdminRemovePlayerParams = {
    player_id: number
}