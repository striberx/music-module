import { ProcessResponses } from './enums';
import { PlaylistData, Track, UnresolvedTrack } from 'magmastream';

export type ProcessResponseType = {
  response?: ProcessResponses;
  trackInfo?: Track | UnresolvedTrack;
  playlistInfo?: PlaylistData;
};
