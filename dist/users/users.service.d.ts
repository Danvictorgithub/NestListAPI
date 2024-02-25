/// <reference types="multer" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/microservice/supabase/supabase.service';
export declare class UsersService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        password: string;
        profilePicture: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        username: string;
        password: string;
        profilePicture: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        username: string;
        password: string;
        profilePicture: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<{
        id: number;
        username: string;
        password: string;
        profilePicture: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        username: string;
        password: string;
        profilePicture: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
