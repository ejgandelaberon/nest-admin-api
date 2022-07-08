import * as mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema({
  uid: String,
  displayName: String,
  photoUrl: String,
  createdAt: Date,
  modifiedAt: Date,
});
