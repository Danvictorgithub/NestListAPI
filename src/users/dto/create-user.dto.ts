import { Length, buildMessage } from "class-validator";

export class CreateUserDto {
    @Length(4, 20)
    username: string;
    @Length(6)
    password: string
}
