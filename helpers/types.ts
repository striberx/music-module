import { ProcessResponses } from './enums';

export type ProcessResponseType = {
  response?: ProcessResponses;
  trackInfo?: unknown; // Set to MoonlinkTrack later
  playlistInfo?: unknown;
};
