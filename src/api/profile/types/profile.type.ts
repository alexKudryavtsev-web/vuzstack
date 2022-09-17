import { UserEntity } from '@app/api/user/user.entity';
import { ProfileEntity } from '../profile.entity';

export type ProfileType = Omit<
  UserEntity,
  'activationLink' | 'agree' | 'updatedAt' | 'password'
> &
  Omit<ProfileEntity, 'id'>;
