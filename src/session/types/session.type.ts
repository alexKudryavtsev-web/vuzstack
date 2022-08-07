import { ProfileType } from '@app/profile/types/profile.type';

export type SessionType = {
  user: ProfileType;
  accessToken: string;
  refreshToken: string;
};
