import { UserEntity } from '@app/user/user.entity';

export type ProfileType = Omit<
  UserEntity,
  'activationLink' | 'agree' | 'updatedAt' | 'password'
> & { avatar: string };
