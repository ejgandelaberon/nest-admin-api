import { Document } from 'mongoose';

export interface UserProfile extends Document {
  readonly uid: string;
  readonly displayName: string;
  readonly photoUrl?: string;
}
