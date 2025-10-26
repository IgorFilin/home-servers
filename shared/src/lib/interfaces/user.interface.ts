export type IUserRoles = 'admin' | 'user' | 'guest';

export interface IUser {
  id: string;
  ip: string;
  email: string;
  name: string;
  password: string;
  isAcceptKey: boolean;
  acceptKey: string;
  authToken: string;
  userPhoto: string;
  role: IUserRoles;
}
