export interface IUserType {
  _id?: string | unknown;
  code?: number;
  description: string;
}

export interface IUserTypeWithStatusCode {
  status: number;
  UserType: IUserType[];
}
