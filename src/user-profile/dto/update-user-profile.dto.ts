import { CreateUserProfileDto } from './create-user-profile.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {}
