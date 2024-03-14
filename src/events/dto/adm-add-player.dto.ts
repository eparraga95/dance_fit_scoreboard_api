import { ApiProperty } from "@nestjs/swagger"

export class AdminAddPlayerDto {
    @ApiProperty()
    player_id: number
}

export type AdminAddPlayerParams = {
    player_id: number
}