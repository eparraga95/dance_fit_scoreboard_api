import { IPlayerPayload } from "src/auth/dto/user-payload";

declare module 'express-serve-static-core' {
    interface Request {
        player?: IPlayerPayload
    }
}