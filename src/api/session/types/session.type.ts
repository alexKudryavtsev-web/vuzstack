import { ProfileType } from '@app/api/profile/types/profile.type';

export type SessionType = {
  user: ProfileType;
  accessToken: string;
  refreshToken: string;
};
