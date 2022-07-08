import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './interfaces/user-profile.interface';
import { UserProfileService } from './user-profile.service';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Post()
  async createUserProfile(
    @Body() dto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.create(dto);
  }

  @Get()
  async getUserProfiles(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  async getOneUserProfile(@Param('id') id: string): Promise<UserProfile> {
    return this.userProfileService.findById(id);
  }

  @Patch(':id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.update(id, dto);
  }

  @Delete(':id')
  async deleteUserProfile(@Param('id') id: string): Promise<UserProfile> {
    return this.userProfileService.remove(id);
  }
}
