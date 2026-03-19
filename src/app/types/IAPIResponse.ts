import { ISong } from "./ISong";

export interface IAPIResponse {
  message: string;
  token?: string;
  songs?: Array<ISong>;
  favoriteSongs?: Array<ISong>;
  users?: unknown[];
  url?: string;
}
