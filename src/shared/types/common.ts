export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface JwtUser {
  sub: Id;
  email: string;
  companyId: Id;
  iat: number;
  exp: number;
}

export interface AppRequest {
  user: JwtUser;
}

export type YesNo = 'Yes' | 'No';
export type YN = 'Y' | 'N';
