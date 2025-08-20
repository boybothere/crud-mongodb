import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class createUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean

    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean

    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean
}

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => createUserSettingsDto)
    settings?: createUserSettingsDto
}