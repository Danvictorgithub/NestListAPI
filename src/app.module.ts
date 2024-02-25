import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './microservice/supabase/supabase.module';

@Module({
  imports: [UsersModule, TodosModule, PrismaModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
