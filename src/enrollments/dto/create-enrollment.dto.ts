import { ApiProperty } from "@nestjs/swagger";

export class CreateEnrollmentDto {
    @ApiProperty()
    player_id: number;
    @ApiProperty()
    event_id: number;
}

export type CreateEnrollmentParams = {
    player_id: number;
    event_id: number;
}