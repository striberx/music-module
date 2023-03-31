import { MoonlinkManager } from 'moonlink.js';
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

  const removedTrack = player.removeSong(trackIndex - 1);
  if (!removedTrack) {
    playResponse.response = ProcessResponses.NoTrackRemoved;
    return playResponse;
  }

  playResponse.response = ProcessResponses.TrackRemoved;
  playResponse.trackInfo = removedTrack;
  return playResponse;
}
