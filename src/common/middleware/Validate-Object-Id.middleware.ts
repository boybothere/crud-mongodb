import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class ValidateObjectMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isValid) throw new HttpException('User not found', 404)
        next()
    }

}