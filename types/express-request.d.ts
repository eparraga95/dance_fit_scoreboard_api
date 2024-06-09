import { IPlayerPayload } from "src/auth/dto/user-payload";

declare module 'express' {
    export interface Request {
        player?: IPlayerPayload
    }
}