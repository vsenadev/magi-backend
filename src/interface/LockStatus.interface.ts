export interface ILockStatus {
  _id?: string | unknown;
  code?: number;
  description: string;
}

export interface ILockStatusWithStatusCode {
  status: number;
  LockStatus: ILockStatus[];
}
