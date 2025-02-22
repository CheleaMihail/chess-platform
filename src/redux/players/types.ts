import { EFetchStatus } from '../../types/enums';
import { IError, IUser } from '../../types/interfaces';

export interface IPlayersState {
  searchedPlayers: IUser[];
  status: EFetchStatus;
  error?: IError;
}
