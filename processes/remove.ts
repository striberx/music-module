import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Removes a track from the lavalink player
 *
 * @param music - Manager
 * @param guildId - Guild ID that the player is in
 * @param trackIndex - Index of the track to remove
 * @returns Object containing a response of ProcessResponseType
 */
export default async function remove(music: Manager, guildId: string, trackIndex: number) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  if (player.queue.size) {
    playResponse.response = ProcessResponses.PlaylistEmpty;
    return playResponse;
  }

  const removedTrack = player.queue.remove(trackIndex - 1);
  if (!removedTrack) {
    playResponse.response = ProcessResponses.NoTrackRemoved;
    return playResponse;
  }

  playResponse.response = ProcessResponses.TrackRemoved;
  playResponse.trackInfo = removedTrack[0];
  return playResponse;
}
