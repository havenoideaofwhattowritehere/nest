import { IsEmail } from "class-validator";

export class AuthJwtPayload  {
    @IsEmail()
    email: string;
}