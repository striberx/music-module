import { MoonlinkTrack } from 'moonlink.js';
import { ProcessResponses } from './enums';

export type ProcessResponseType = {
  response?: ProcessResponses;
  trackInfo?: MoonlinkTrack;
  playlistInfo?: unknown;
};
