import { UserType } from '@app/user/types/user.type';

export type SessionType = {
  user: UserType;
  accessToken: string;
  refreshToken: string;
};
