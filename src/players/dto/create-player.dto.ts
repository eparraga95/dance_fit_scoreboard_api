export class CreatePlayerDto {
    nickname: string;
    password: string;
    confirmPassowrd: string;
    is_admin: boolean;
}

export class CreatePlayerParams {
    nickname: string;
    password: string;
    confirmPassowrd: string;
    is_admin: boolean;
}
