import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(UserSettings.name) private readonly userSettingsModel: Model<UserSettings>) { }

    async createUser({ settings = {}, ...createUserDto }: CreateUserDto) {

        const createSettings = {
            receiveNotifications: settings.receiveNotifications ?? true,
            receiveEmails: settings.receiveEmails ?? true,
            receiveSMS: settings.receiveSMS ?? true,
        }
        const newUserSettings = await this.userSettingsModel.create(createSettings)
        const saveNewSettings = await newUserSettings.save()
        const newUser = await this.userModel.create({
            ...createUserDto,
            settings: saveNewSettings._id
        })
        return newUser
    }

    getAllUsers() {
        return this.userModel.find().populate('settings')
    }

    async getUserById(id: string) {
        const user = await this.userModel.findById(id).populate('settings')
        if (!user) throw new NotFoundException('User not found!')
        return user
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const findUser = await this.userModel.findById(id)
        if (!findUser) throw new NotFoundException("User not found, invalid request!")
        await this.userModel.findByIdAndUpdate(id, updateUserDto)
        return { message: "User updated successfully" }
    }

    async deleteUser(id: string) {
        const findUser = await this.userModel.findById(id)
        if (!findUser) throw new NotFoundException("User not found, invalid request!")
        await this.userModel.findByIdAndDelete(id)
        return { message: "User deleted successfully" }
    }
}
