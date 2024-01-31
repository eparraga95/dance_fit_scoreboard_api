export class CreatePlayerDto {
    nickname: string;
    password: string;
    confirmPassword: string;
    is_admin: boolean;
}

export class CreatePlayerParams {
    nickname: string;
    password: string;
    confirmPassword: string;
    is_admin: boolean;
}
