import { EFetchStatus } from "../../types/enums";

export interface IError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ILoginResponse {
  id: number;
  username: string;
  access_token: string;
  refresh_token: string;
}

export interface IAuthState {
  id?: number;
  error?: IError;
  status: EFetchStatus;
}

export interface IRefreshResponse
  extends Omit<ILoginResponse, "refresh_token"> {}
