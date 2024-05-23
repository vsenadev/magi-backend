export interface IUser {
  _id?: string | unknown;
  name: string;
  picture?: string;
  id_company: string;
  cpf: string;
  telephone: string;
  password: string;
  mail: string;
  type: number;
  status: number;
}

export interface IUserWithStatusCode {
  status: number;
  users: IUser[];
}
