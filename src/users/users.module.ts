import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ValidateObjectMiddleware } from 'src/common/middleware/Validate-Object-Id.middleware';

@Module({
    imports: [MongooseModule.forFeature([{
        name: User.name,
        schema: userSchema
    }])],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateObjectMiddleware)
            .forRoutes(
                {
                    path: 'users/:id',
                    method: RequestMethod.GET
                },
                {
                    path: 'users/:id',
                    method: RequestMethod.PATCH
                },
                {
                    path: 'users/:id',
                    method: RequestMethod.DELETE
                })
    }
}
