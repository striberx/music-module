export enum ProcessResponses {
  NoPlayer = 'NO_PLAYER_EXISTS',
  PlayerBusy = 'PLAYER_BUSY',
  PlayerNotPlaying = 'PLAYER_NOT_PLAYING',
  NoMatches = 'NO_MATCHES',
  LoadFailed = 'LOAD_FAILED',
  PlaylistLoaded = 'PLAYLIST_LOADED',
  TrackLoaded = 'TRACK_LOADED',
  TrackRemoved = 'TRACK_REMOVED',
  NoTrackRemoved = 'NO_TRACK_REMOVED',
  TrackSkipped = 'TRACK_SKIPPED',
  PlayerPaused = 'PLAYER_PAUSED',
  PlayerDisconnected = 'PLAYER_DISCONNECTED',
}

export enum LoadTypes {
  SearchResult = 'search',
  TrackLoaded = 'track',
  PlaylistLoaded = 'playlist',
  NoMatches = 'empty',
  LoadFailed = 'error',
}
