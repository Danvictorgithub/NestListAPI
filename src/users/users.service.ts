import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SupabaseService } from 'src/microservice/supabase/supabase.service';

interface ExtendedUpdateUserDto extends UpdateUserDto {
  profilePicture: string;
}
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly supabase: SupabaseService) { }
  async create(createUserDto: CreateUserDto) {
    const userExist = await this.prisma.user.findUnique({ where: { username: createUserDto.username.toLowerCase() } });
    if (userExist) {
      throw new BadRequestException("User Already Exist");
    }
    const password = await bcrypt.hash(createUserDto.password, parseInt(process.env.SECRET_KEY));
    return this.prisma.user.create({ data: { username: createUserDto.username.toLowerCase(), password } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    if (updateUserDto.username) {
      const userExist = await this.prisma.user.findUnique({ where: { username: updateUserDto.username.toLowerCase() } });
      if (userExist) {
        throw new BadRequestException("This Username Already Exist, Please Choose Another");
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, parseInt(process.env.SECRET_KEY));
    }
    if (file) {
      (updateUserDto as ExtendedUpdateUserDto).profilePicture = await this.supabase.uploadImage(file);
    }
    const updatedUser = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    await this.prisma.todo.deleteMany({ where: { userId: user.id } });
    return this.prisma.user.delete({ where: { id } });
  }
}
