import { MoonlinkManager } from 'moonlink.js';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Loops lavalink player
 *
 * @param music - MoonlinkManager
 * @param guildId - Guild ID that the player is in
 * @param loop - Value to represent loop type (1 - Track, 2 - Queue)
 * @returns Object containing a response of ProcessResponseType
 */
export default async function disconnect(music: MoonlinkManager, guildId: string, loop: string | number) {
  const playResponse = {} as ProcessResponseType;

  console.log(loop);

  const player = music.players.get(guildId);
  if (!player?.connected) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  player.disconnect();
  player.destroy();

  playResponse.response = ProcessResponses.PlayerDisconnected;
  return playResponse;
}
