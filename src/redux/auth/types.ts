import { EFetchStatus } from '../../types/enums';
import { IError } from '../../types/interfaces';

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

export interface IRefreshResponse extends Omit<ILoginResponse, 'refresh_token'> {}
