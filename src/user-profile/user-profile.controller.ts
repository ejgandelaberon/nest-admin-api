import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request as Req,
} from '@nestjs/common';
import { Request } from 'express';
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
  async getUserProfiles(@Req() req: Request) {
    return this.userProfileService.findAll(req);
  }

  @Get(':id')
  async getOneUserProfile(@Param('id') id: string): Promise<UserProfile> {
    return this.userProfileService.findById(id);
  }

  @Get('single/:uid')
  async getOneUserProfileByUid(
    @Param('uid') uid: string,
  ): Promise<UserProfile | { data: string }> {
    const userProfile = await this.userProfileService.findByUid(uid);
    if (!userProfile) return { data: 'empty' };
    return userProfile;
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
