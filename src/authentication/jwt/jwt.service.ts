import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";


interface userObj {
    id:number;
    email:string;
    cart:Array<any>;
    cartCount:number;
    isMerchant:boolean;
    merchant: {id:number,userId:number,isVerified:boolean},
    status:string
}
@Injectable()
export class JwtService {
    decode(token:string):userObj {
        try {
            return jwt.verify(token,process.env.JWT_SECRET) as userObj; 
        } catch (error) { 
            throw new UnauthorizedException("Invalid token"); 
        }
    }
}
