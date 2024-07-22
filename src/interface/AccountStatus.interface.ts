export interface IAccountStatus {
  _id?: string | unknown;
  code?: number;
  description: string;
}

export interface IAccountStatusWithStatusCode {
  status: number;
  AccountStatus: IAccountStatus[];
}

export interface IDescription {
  description: string;
}
