import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('/users/:userId/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Param('userId') userId: string) {
    return this.todosService.create(createTodoDto, +userId);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.todosService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.todosService.findOne(+id, +userId);
  }

  @Patch(':id')
  update(@Param('userId') userId: string, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto, +userId);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.todosService.remove(+id, +userId);
  }
}
