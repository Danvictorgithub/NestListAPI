"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const supabase_service_1 = require("../microservice/supabase/supabase.service");
let UsersService = class UsersService {
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async create(createUserDto) {
        const userExist = await this.prisma.user.findUnique({ where: { username: createUserDto.username.toLowerCase() } });
        if (userExist) {
            throw new common_1.BadRequestException("User Already Exist");
        }
        const password = await bcrypt.hash(createUserDto.password, parseInt(process.env.SECRET_KEY));
        return this.prisma.user.create({ data: { username: createUserDto.username.toLowerCase(), password } });
    }
    async findAll() {
        return await this.prisma.user.findMany();
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException("User Not Found");
        }
        return user;
    }
    async update(id, updateUserDto, file) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException("User Not Found");
        }
        if (updateUserDto.username) {
            const userExist = await this.prisma.user.findUnique({ where: { username: updateUserDto.username.toLowerCase() } });
            if (userExist) {
                throw new common_1.BadRequestException("This Username Already Exist, Please Choose Another");
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, parseInt(process.env.SECRET_KEY));
        }
        if (file) {
            updateUserDto.profilePicture = await this.supabase.uploadImage(file);
        }
        const updatedUser = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });
        return updatedUser;
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException("User Not Found");
        }
        return this.prisma.user.delete({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, supabase_service_1.SupabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map