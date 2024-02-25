import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return { message: "Welcome to the NestJSTodo API v1.0.0!" }
  }
}
