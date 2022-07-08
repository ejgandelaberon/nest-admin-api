import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from './interfaces/user-profile.interface';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject('USER_PROFILE_MODEL')
    private userProfileModel: Model<UserProfile>,
  ) {}

  async create(dto: CreateUserProfileDto): Promise<UserProfile> {
    const createdUserProfile = new this.userProfileModel({
      ...dto,
      createdAt: new Date(),
    });
    return createdUserProfile.save();
  }

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileModel.find().exec();
  }

  async findById(id: string): Promise<UserProfile> {
    return this.userProfileModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateUserProfileDto): Promise<UserProfile> {
    await this.userProfileModel
      .findByIdAndUpdate(id, { ...dto, modifiedAt: new Date() })
      .exec();
    const updated = await this.findById(id);
    return updated;
  }

  async remove(id: string): Promise<UserProfile> {
    return this.userProfileModel.findByIdAndDelete(id).exec();
  }
}
