import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './microservice/supabase/supabase.module';
import { AuthModule } from './authentication/auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, SupabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
