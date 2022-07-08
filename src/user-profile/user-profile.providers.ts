import { Connection } from 'mongoose';
import { UserProfileSchema } from './schemas/user-profile.schema';

export const userProfileProvider = [
  {
    provide: 'USER_PROFILE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('UserProfile', UserProfileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
