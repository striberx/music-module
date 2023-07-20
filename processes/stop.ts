import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Stops the player and clears the queue
 *
 * @param music - Manager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function stop(music: Manager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  player.queue.clear();
  player.stop();

  playResponse.response = ProcessResponses.PlayerStopped;
  return playResponse;
}
