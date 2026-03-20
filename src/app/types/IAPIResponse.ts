import { ISong } from "./ISong";
import { IStation } from "./IStation";

export interface IAPIResponse {
  message: string;
  token?: string;
  songs?: Array<ISong>;
  favoriteSongs?: Array<ISong>;
  stations?:Array<IStation>;
  users?: unknown[];
  url?: string;
}
