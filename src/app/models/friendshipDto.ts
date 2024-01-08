import { UserProfile } from './userProfile';
import { DummyUserDto } from './dummyUserDto';

export interface FriendshipDTO {
  id: string;
  inviterUser: UserProfile;
  inviteeUser: UserProfile | null;
  dummyUser: DummyUserDto | null;
  status: string;
}
