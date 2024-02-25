import { OnModuleInit } from '@nestjs/common';
export declare class SupabaseService implements OnModuleInit {
    private supabase;
    onModuleInit(): Promise<void>;
    uploadImage(file: any): Promise<string>;
}
