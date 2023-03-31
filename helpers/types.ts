import { ProcessResponses } from './enums';

export type ProcessResponseType = {
  response?: ProcessResponses;
  trackInfo?: unknown;
  playlistInfo?: unknown;
};
