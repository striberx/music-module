import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Plays the previous song
 *
 * @param music - Manager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function previous(music: Manager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  // TODO: Errors out if using on the first song in the queue
  // Also, it does nothing if the player is not playing.
  player.previous();

  playResponse.response = ProcessResponses.TrackLoaded;
  return playResponse;
}
