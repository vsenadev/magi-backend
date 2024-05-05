export interface IAccountStatus {
  _id?: string;
  code?: number;
  description: string;
}

export interface IAccountStatusWithStatusCode {
  status: number;
  AccountStatus: IAccountStatus[];
}
