import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    nickname: string;
    password: string;
    role: string;
}

export type UpdatePlayerParams = {
    nickname: string
    password: string;
    role: string;
}