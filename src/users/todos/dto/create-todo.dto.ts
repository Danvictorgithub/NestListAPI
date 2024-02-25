import { Length } from "class-validator";

export class CreateTodoDto {
    @Length(1, 128)
    content: string
}
