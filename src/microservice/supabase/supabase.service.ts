import { Injectable, InternalServerErrorException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabase: SupabaseClient;
    async onModuleInit() {
        try {
            this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

            // Perform a test query to check the validity of the Supabase key
            // const { data, error } = await this.supabase.from('').select('*').limit(1);

            // if (error) {
            //   throw new Error(`Error performing test query: ${error.message}`);
            // }

            console.log('Supabase Initialized');
        } catch (error) {
            console.error('Error initializing Supabase:', error.message);
            throw new InternalServerErrorException();
        }
    }
    async uploadImage(file) {
        // Uploads File image and returns public link
        const { data, error } = await this.supabase.storage
            .from('Images')
            //Generates random filename
            .upload(`${file.fieldname}/${randomUUID()}.${file.originalname.split('.').pop()}`, file.buffer, { contentType: file.mimetype });
        if (error) {
            throw new UnprocessableEntityException(error);
        }
        const link = await this.supabase.storage.from('Images').getPublicUrl(data.path).data.publicUrl;
        return link;
    }
}
