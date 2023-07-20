import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Disconncts and destroys lavalink player
 *
 * @param music - Manager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function disconnect(music: Manager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  player.disconnect();
  player.destroy();

  playResponse.response = ProcessResponses.PlayerDisconnected;
  return playResponse;
}
