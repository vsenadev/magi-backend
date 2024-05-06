export interface IUserType {
  _id?: string;
  code?: number;
  description: string;
}

export interface IUserTypeWithStatusCode {
  status: number;
  UserType: IUserType[];
}
