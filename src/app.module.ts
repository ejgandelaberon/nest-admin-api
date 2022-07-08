import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { DatabaseModule } from './providers/database/database.module';

@Module({
  imports: [UserProfileModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
