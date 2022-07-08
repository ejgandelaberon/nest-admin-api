import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { userProfileProvider } from './user-profile.providers';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserProfileService, ...userProfileProvider],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
