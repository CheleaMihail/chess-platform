export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface IError {
  message: string;
  errors?: Record<string, string[]>;
}
