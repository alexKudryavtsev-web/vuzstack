import { UserEntity } from '@app/api/user/user.entity';

export type ProfileType = Omit<
  UserEntity,
  'activationLink' | 'agree' | 'updatedAt' | 'password'
> & { avatar: string };
