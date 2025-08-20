import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ValidateObjectMiddleware } from 'src/common/middleware/Validate-Object-Id.middleware';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
    },
    {
        name: UserSettings.name,
        schema: UserSettingsSchema
    },
    ])],
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
