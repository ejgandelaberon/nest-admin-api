import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty({ message: 'UID must not be empty.' })
  @IsString()
  uid: string;

  @IsNotEmpty({ message: 'Display name must not be empty.' })
  @IsString()
  displayName: string;

  @IsString()
  photoUrl?: string = '';
}
