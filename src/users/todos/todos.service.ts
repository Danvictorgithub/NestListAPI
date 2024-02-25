import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    return this.prisma.todo.create({ data: { ...createTodoDto, userId } });
  }

  async findAll(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    return this.prisma.todo.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new BadRequestException("Todo Not Found");
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    if (updateTodoDto.completed) {
      updateTodoDto.completed = updateTodoDto.completed.toString() === "true" ? true : false;
    }
    const updatedTodo = await this.prisma.todo.update({ where: { id }, data: { ...updateTodoDto } });
    return updatedTodo;
  }

  async remove(id: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new BadRequestException("Todo Not Found");
    }
    return this.prisma.todo.delete({ where: { id } });
  }
}
