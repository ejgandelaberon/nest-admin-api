import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserProfile } from './interfaces/user-profile.interface';
import { UserProfileMessages } from './user-profile.enum';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { Request } from 'express';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject('USER_PROFILE_MODEL')
    private userProfileModel: Model<UserProfile>,
  ) {}

  async create(dto: CreateUserProfileDto): Promise<UserProfile> {
    try {
      const uid = await this.userProfileModel.findOne({ uid: dto.uid }, 'uid');
      if (uid) throw new BadRequestException(UserProfileMessages.EXISTS);
      const createdUserProfile = new this.userProfileModel({
        ...dto,
        createdAt: new Date(),
      });
      return createdUserProfile.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(req?: Request) {
    let query = {};
    let sortOption = {};

    if (req.query.search) {
      query = {
        $or: [
          { uid: new RegExp(req.query.search.toString()) },
          { displayName: new RegExp(req.query.search.toString(), 'i') },
          { photoUrl: new RegExp(req.query.search.toString(), 'i') },
        ],
      };
    }

    if (req.query.sort) {
      sortOption = {
        displayName: req.query.sort,
      };
    }

    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const total = await this.count(query);

    const data = await this.userProfileModel
      .find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<UserProfile> {
    return this.userProfileModel.findById(id).exec();
  }

  async findByUid(uid: string): Promise<UserProfile> {
    return this.userProfileModel.findOne({ uid: uid }).exec();
  }

  async update(id: string, dto: UpdateUserProfileDto): Promise<UserProfile> {
    await this.userProfileModel
      .findByIdAndUpdate(id, {
        displayName: dto.displayName,
        photoUrl: dto.photoUrl,
        modifiedAt: new Date(),
      })
      .exec();
    const updated = await this.findById(id);
    return updated;
  }

  async remove(id: string): Promise<UserProfile> {
    return this.userProfileModel.findByIdAndDelete(id).exec();
  }

  async count(query: any) {
    return this.userProfileModel.count(query);
  }
}
