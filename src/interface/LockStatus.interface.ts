export interface ILockStatus {
    _id?: string;
    code?: number;
    description: string;
  }

export interface ILockStatusWithStatusCode {
  status: number;
  LockStatus: ILockStatus[];
}
