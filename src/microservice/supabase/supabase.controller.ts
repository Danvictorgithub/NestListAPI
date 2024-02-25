import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('supabase')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {
  }
}
