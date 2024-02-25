import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/microservice/supabase/supabase.module';
import { TodosModule } from './todos/todos.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, SupabaseModule, TodosModule]
})
export class UsersModule { }
