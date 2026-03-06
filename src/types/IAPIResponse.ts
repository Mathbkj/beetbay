import { ISong } from "./ISong";

export interface IAPIResponse {
  message: string;
  token?: string;
  songs?: Array<ISong>;
  users?: unknown[];
}
