export enum ProcessResponses {
  NoPlayer = 'NO_PLAYER_EXISTS',
  PlayerDisconnected = 'PLAYER_DISCONNECTED',
  PlayerBusy = 'PLAYER_BUSY',
  LoadFailed = 'LOAD_FAILED',
  NoMatches = 'NO_MATCHES',
  PlaylistLoaded = 'PLAYLIST_LOADED',
  TrackLoaded = 'TRACK_LOADED',
  NoTrackRemoved = 'NO_TRACK_REMOVED',
  TrackRemoved = 'TRACK_REMOVED',
}

export enum LoadTypes {
  SearchResult = 'SEARCH_RESULT',
  TrackLoaded = 'TRACK_LOADED',
  PlaylistLoaded = 'PLAYLIST_LOADED',
  NoMatches = 'NO_MATCHES',
  LoadFailed = 'LOAD_FAILED',
}
