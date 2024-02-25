"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const crypto_1 = require("crypto");
let SupabaseService = class SupabaseService {
    async onModuleInit() {
        try {
            this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
            console.log('Supabase Initialized');
        }
        catch (error) {
            console.error('Error initializing Supabase:', error.message);
            throw new common_1.InternalServerErrorException();
        }
    }
    async uploadImage(file) {
        const { data, error } = await this.supabase.storage
            .from('Images')
            .upload(`${file.fieldname}/${(0, crypto_1.randomUUID)()}.${file.originalname.split('.').pop()}`, file.buffer, { contentType: file.mimetype });
        if (error) {
            throw new common_1.UnprocessableEntityException(error);
        }
        const link = await this.supabase.storage.from('Images').getPublicUrl(data.path).data.publicUrl;
        return link;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)()
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map