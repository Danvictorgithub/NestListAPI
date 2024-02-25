import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsBoolean()
    @Transform(({ value }) => { if (typeof value === 'string') return value === 'true'; return value; })
    completed: boolean
}
