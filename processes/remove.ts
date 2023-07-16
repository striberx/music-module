import type { MoonlinkManager } from 'moonlink.js';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Removes a track from the lavalink player
 *
 * @param music - MoonlinkManager
 * @param guildId - Guild ID that the player is in
 * @param trackIndex - Index of the track to remove
 * @returns Object containing a response of ProcessResponseType
 */
export default async function remove(music: MoonlinkManager, guildId: string, trackIndex: number) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player?.connected) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  if (player.queue.size === 0n) {
    playResponse.response = ProcessResponses.PlaylistEmpty;
    return playResponse;
  }

  // TODO: RemovedTrack currently returns a boolean
  // In a future update of Moonlink it will return the track info
  const removedTrack = player.queue.remove(trackIndex - 1);
  if (!removedTrack) {
    playResponse.response = ProcessResponses.NoTrackRemoved;
    return playResponse;
  }

  playResponse.response = ProcessResponses.TrackRemoved;
  // playResponse.trackInfo = removedTrack;
  return playResponse;
}
